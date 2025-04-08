import S3 from '#config/aws.config'
import S3ADMIN from '#config/awsadmin.config'
import serviceConfig from '#config/services'
import fs from 'node:fs'
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import SendResponse from '#helpers/send_response_helper'

// export async function uploadToS3(filename: string, fileStream: fs.ReadStream) {
//   try {
//     let newName: string[] = filename.split('.')
//     let ext = newName[newName.length - 1]
//     newName[0] = newName[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
//     newName = [newName[0] + '-' + Date.now() + '.' + ext]
//     await S3.send(
//       new PutObjectCommand({
//         Bucket: serviceConfig.aws.bucketName,
//         Key: newName.join('.'),
//         Body: fileStream,
//         ACL: 'public-read',
//       })
//     )
//     // let url = `https://${serviceConfig.aws.bucket}.s3.${serviceConfig.aws.region}.amazonaws.com/${newName.join('.')}`
//     // return url
//     return newName.join('.')
//   } catch (error) {
//     console.error('Error uploading file to S3:', error)
//     SendResponse.logError(error)
//     throw error
//   }
// }

export async function uploadToS3(filename: string, fileStream: fs.ReadStream) {
  try {
    let newName: string[] = filename.split('.');
    let ext = newName[newName.length - 1];
    newName[0] = newName[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    newName = [newName[0] + '-' + Date.now() + '.' + ext];

    await S3.send(
      new PutObjectCommand({
        Bucket: serviceConfig.aws.bucketName,
        Key: newName.join('.'),
        Body: fileStream,
        ACL: 'public-read',
      })
    );

    const fileUrl = `${serviceConfig.aws.url}/${newName.join('.')}`;
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    SendResponse.logError(error);
    throw error;
  }
}


export async function getFileUrl(filename: string) {
  try {
    const { Body } = await S3.send(
      new GetObjectCommand({
        Bucket: serviceConfig.aws.bucketName,
        Key: filename,
      })
    )
    return await Body?.transformToString()
  } catch (error) {
    SendResponse.logError(error)
    console.error('Error getting file URL:', error)
    throw error
  }
}

export async function deleteFromS3(filename: string) {
  try {
    let result = await S3.send(
      new DeleteObjectCommand({
        Bucket: serviceConfig.aws.bucketName,
        Key: filename,
      })
    )
    return result.DeleteMarker
  } catch (error) {
    throw error
  }
}

export async function uploadDataToS3(
  filename: string,
  fileStream: fs.ReadStream,
  isImage: boolean
) {
  try {
    let newName: string[] = filename.split('.')
    let ext = newName[newName.length - 1]
    newName[0] = newName[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    newName = [newName[0] + '-' + Date.now() + '.' + ext]
    const s3Key = isImage ? `public/uploads/${newName}` : `themes/${filename}`
    await S3ADMIN.send(
      new PutObjectCommand({
        Bucket: serviceConfig.aws.admin.bucket,
        Key: s3Key,
        Body: fileStream,
        ACL: 'public-read',
      })
    )

    return s3Key
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    throw error
  }
}

export async function uploadThemeDataToS3(
  filename: string,
  fileStream: fs.ReadStream,
  isImage: boolean,
  theme: boolean
) {
  try {
    if (theme) {
      const s3Key = `themes/${filename}`
      await S3ADMIN.send(
        new PutObjectCommand({
          Bucket: serviceConfig.aws.admin.bucket,
          Key: s3Key,
          Body: fileStream,
          ACL: 'public-read',
        })
      )
      return s3Key
    } else {
      let newName: string[] = filename.split('.')
      let ext = newName[newName.length - 1]
      newName[0] = newName[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
      newName = [newName[0] + '-' + Date.now() + '.' + ext]
      const s3Key = isImage ? `templates/images/${newName}` : `templates/${filename}`
      await S3ADMIN.send(
        new PutObjectCommand({
          Bucket: serviceConfig.aws.admin.bucket,
          Key: s3Key,
          Body: fileStream,
          ACL: 'public-read',
        })
      )

      return s3Key
    }
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    throw error
  }
}
