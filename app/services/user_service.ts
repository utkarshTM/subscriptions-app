import User from '#models/user';
import UserPhoto from '#models/user_photo';
import { uploadToS3 } from '#utils/s3_helper';
import fs from 'fs';
import path from 'path';

interface UploadedFile {
  tmpPath: string; 
  clientName: string;
  type: string; 
}

interface FileInput {
  photos?: UploadedFile | UploadedFile[]; 
}

class UserService {
  static async registerUser(data: Record<string, any>, files: FileInput) {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid user data provided.');
      }

      const imageUrls: string[] = [];

     
      if (files && files.photos) {
        const photos = Array.isArray(files.photos) ? files.photos : [files.photos];

        for (const photo of photos) {
          const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          if (!allowedMimeTypes.includes(photo.type)) {
            throw new Error(`Unsupported file type: ${photo.type}`);
          }

          const uniqueFileName = `${Date.now()}_${path.basename(photo.clientName)}`;

          const fileStream = fs.createReadStream(photo.tmpPath);

          const fileUrl = await uploadToS3(uniqueFileName, fileStream);
          imageUrls.push(fileUrl);

          fs.unlink(photo.tmpPath, (err) => {
            if (err) {
              console.warn(`Failed to remove temp file: ${photo.tmpPath}`, err);
            }
          });
        }
      }
    const user = await User.create(data);

      // Save images in the UserPhoto model
      if (imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          await UserPhoto.create({
            userId: user.id,
            images: [imageUrl],
          });
        }
      }

      // Return the created user and associated images
      const userPhotos = await UserPhoto.query().where('userId', user.id).select('images');
      return { ...user.toJSON(), images: userPhotos.map((photo) => photo.images).flat() };
    } catch (error) {
      console.error('Error registering user:', error);

      if (files && files.photos) {
        const photos = Array.isArray(files.photos) ? files.photos : [files.photos];
        photos.forEach((photo) => {
          if (photo.tmpPath && fs.existsSync(photo.tmpPath)) {
            fs.unlink(photo.tmpPath, (err) => {
              if (err) {
                console.warn(`Failed to remove temp file: ${photo.tmpPath}`, err);
              }
            });
          }
        });
      }

      throw error;
    }
  }
}

export default UserService;
