import SendResponse from '#helpers/send_response_helper';
import User from '#models/user';
import UserDetails from '#models/user_detail';
import UserAddress from '#models/user_address';
import UserPreferences from '#models/user_preference';
import UserPhoto from '#models/user_photo';
import type { HttpContext } from '@adonisjs/core/http';
import vine from '@vinejs/vine';
import hash from '@adonisjs/core/services/hash';
import fs from 'node:fs';
import { uploadToS3 } from '#utils/s3_helper';
import { Auth } from '#utils/auth';
import { DateTime } from 'luxon';
import PasswordResetToken from '#models/password_reset_token';
import mail from '@adonisjs/mail/services/main'


export default class UserController {
 
 /**
   * Register user 
   */
 async registerUser({ request, response }: HttpContext) {
  try {
    // Validate basic user data
    const userData = await request.validateUsing(
      vine.compile(
        vine.object({
          email: vine.string().trim().email(),
          password: vine.string().trim().minLength(6),
          firstName: vine.string().trim(),
          lastName: vine.string().trim(),
          phone: vine.string().regex(/^[\d]{10,15}$/).optional(),
        })
      )
    );

    // Check if user already exists
    const userExists = await User.findBy('email', userData.email);
    if (userExists) {
      return response.status(409).send(SendResponse.error('User already exists', 409));
    }

    // Create the user
    const user = new User();
    user.email = userData.email;
    user.password = userData.password
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.phone = userData.phone;
    await user.save();

    return response.status(201).send(SendResponse.success('Basic user registered successfully', { id: user.id }));
  } catch (error) {
    console.error(error);
    return response.status(500).send(SendResponse.error('Failed to register user.', 500, error.message));
  }
}



/**
   * Save user details with new approach
   */
async editUserProfile({ request, response, auth }: HttpContext) {
  try {
    // Ensure the user is authenticated
    const user = auth.user;
    if (!user) {
      return response.unauthorized({ message: 'User not authenticated' });
    }
    

    // Fetch the data from the request
    const payload = request.only([
      // UserDetails fields
      'gender',
      'dateOfBirth',
      'religion',
      'motherTongue',
      'education',
      'occupation',
      'height',
      'annualIncome',
      'stateLiving',
      'maritalStatus',
      'dietPreference',
      'community',
      'zodiacSign',
      'profileCreatedBy',

      // UserAddress fields
      'address',
      'city',
      'state',
      'postalCode',
      'country',

      // UserPreferences fields
      'dietPreference',
      'interests',
      'doYouSmoke',
      'doYouDrink',
      'doYouWorkout',
      'havePets',
      'interestedIn',
      'lookingFor',
      'sexualOrientation',

      // UserPhoto fields
      'images',
    ]);

    // Update UserDetails
    const userDetails = await UserDetails.firstOrCreate({ userId: user.id });
    userDetails.merge({
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      religion: payload.religion,
      motherTongue: payload.motherTongue,
      education: payload.education,
      occupation: payload.occupation,
      height: payload.height,
      annualIncome: payload.annualIncome,
      stateLiving: payload.stateLiving,
      maritalStatus: payload.maritalStatus,
      dietPreference: payload.dietPreference,
      community: payload.community,
      zodiacSign: payload.zodiacSign,
      profileCreatedBy: payload.profileCreatedBy,
    });
    await userDetails.save();

    // Update UserAddress
    const userAddress = await UserAddress.firstOrCreate({ userId: user.id });
    userAddress.merge({
      address: payload.address,
      city: payload.city,
      state: payload.state,
      postalCode: payload.postalCode,
      country: payload.country,
    });
    await userAddress.save();

    // Update UserPreferences
    const userPreferences = await UserPreferences.firstOrCreate({ userId: user.id });
    userPreferences.merge({
      dietPreference: payload.dietPreference,
      interests: payload.interests,
      doYouSmoke: payload.doYouSmoke,
      doYouDrink: payload.doYouDrink,
      doYouWorkout: payload.doYouWorkout,
      havePets: payload.havePets,
      interestedIn: payload.interestedIn,
      lookingFor: payload.lookingFor,
      sexualOrientation: payload.sexualOrientation,
    });
    await userPreferences.save();

     if (payload.images && Array.isArray(payload.images)) {
      await UserPhoto.query().where('user_id', user.id).delete();

      // Save new image URLs
      for (const imageUrl of payload.images) {
        await UserPhoto.create({
          userId: user.id,
          imageUrl,
        });
      }
    }

    return response.ok({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return response.status(500).send({ error: 'Failed to update profile' });
  }
}



  /**
   * Login a user and return a JWT token
   */
  public async loginUser({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password']);

      const user = await User.query().where('email', email).firstOrFail();
      const isPasswordValid = await hash.verify(user.password, password);
      if (!isPasswordValid) {
        return response.status(401).send(SendResponse.error('Invalid credentials', 401));
      }

      const token = await Auth.createToken(user)

      return response.status(200).send(SendResponse.success('Login successful', { token }));
    } catch (error) {
      console.error(error);

      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send(SendResponse.error('User not found', 404));
      }

      return response.status(400).send(SendResponse.error('Authentication failed', 400, error.message));
    }
  }



  /**
   * Request for Password Reset
   */
  public async requestPasswordReset({ request, response }: HttpContext) {
    const email = request.input('email');
    const user = await User.findBy('email', email);

    if (!user) {
        return response.status(404).send({ message: 'User not found' });
    }

    const token = await Auth.createToken(user);
    const expiresAt = DateTime.now().plus({ hours: 1 });

    await PasswordResetToken.updateOrCreate(
        { email:user.email },
        { userId: user.id, email, token, expiresAt } 
    );
    const resetToken = await PasswordResetToken.findBy('email', user.email);
    console.log('Saved Reset Token:', resetToken);

    const resetLink = `${request.input('baseUrl')}/reset-password/${token}`;

    // const emailHtml = await View.render('email/reset_password', { resetLink });


    await mail.send((message) => {
        message
            .to(email)
            .from('uttkarsh7777777@gmail.com', 'Utkarsh Chauhan')
            .subject('Reset Your Password')
            .html(`
                <html>
                    <head><title>Reset Your Password</title></head>
                    <body>
                        <p>Hello,</p>
                        <p>Click the link below to reset your password:</p>
                        <a href="${resetLink}">Reset Password</a>
                        <p>If you did not request this, please ignore this email.</p>
                    </body>
                </html>
            // .html(emailHtml);
            `);
    });

    return response.ok({ message: 'Reset password email sent' });
}



  /**
   * Password Reset
   */
  public async resetPassword({ request, response }: HttpContext) {
    const { token, password } = request.only(['token', 'password']);
    const resetToken = await PasswordResetToken.query().where('token', token).first();
    if (!resetToken || !resetToken.expiresAt || resetToken.expiresAt < DateTime.now()) {
      return response.status(400).send({ message: 'Invalid or expired token' });
    }

    const user = await User.findBy('email', resetToken.email);
    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    }

    user.password = password;
    await user.save();

    await resetToken.delete();
    return response.ok({ message: 'Password reset successful' });
  }



  

  /**
   * Get all Users Details
   */
  async fetchAllUsers({ response }: HttpContext) {
    try {
        const users = await User.query()
            .preload('userPreferences')
            .preload('userPhoto')
            .preload('userDetails')
            .preload('userAddress'); 

        const usersData = users.map((user) => {
            const userDetails = user.userDetails || {};
            const userPreferences = user.userPreferences || {};
            const primaryAddress = user.userAddress?.[0];

            return {
                id: user.id,
                firstName: user.firstName || 'N/A',
                lastName: user.lastName || 'N/A',
                gender: userDetails.gender || 'N/A',
                dateOfBirth: userDetails.dateOfBirth || 'N/A',
                phone: user.phone || 'N/A',
                email: user.email || 'N/A',
                religion: userDetails.religion || 'N/A',
                motherTongue: userDetails.motherTongue || 'N/A',
                city: primaryAddress?.city || 'N/A',
                country: primaryAddress?.country || 'N/A',
                community: userDetails.community || 'N/A',
                maritalStatus: userDetails.maritalStatus || 'N/A',
                education: userDetails.education || 'N/A',
                occupation: userDetails.occupation || 'N/A',
                annualIncome: userDetails.annualIncome || 'N/A',
                height: userDetails.height || 'N/A',
                doYouSmoke: userPreferences.doYouSmoke || 'N/A',
                doYouDrink: userPreferences.doYouDrink || 'N/A',
                doYouWorkout: userPreferences.doYouWorkout || 'N/A',
                havePets: userPreferences.havePets || 'N/A',
                interestedIn: userPreferences.interestedIn || 'N/A',
                zodiacSign: userDetails.zodiacSign || 'N/A',
                lookingFor: userPreferences.lookingFor || 'N/A',
                sexualOrientation: userPreferences.sexualOrientation || 'N/A',
            };
        });

        return response.status(200).send(usersData);
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).send({ error: 'Failed to fetch users' });
    }
}




  /**
   * Get Users Profile Details
   */
  async fetchUserProfile({ auth, response }: HttpContext) {
    try {
        if (!auth?.user) {
            return response.status(401).send({
                success: false,
                error: {
                    code: 401,      
                    message: 'Unauthorized: User not authenticated',
                },
            });
        }

        const user = auth.user;

        if (!user) {
            return response.status(404).send({ error: 'User not found' });
        }

        // Load necessary relations
        await user.load('userPreferences');
        await user.load('userPhoto');
        await user.load('userDetails');
        await user.load('userAddress');

        const userDetails = user.userDetails || {};
        const userPreferences = user.userPreferences || {};
        const primaryAddress = user.userAddress?.[0];

        // Prepare the detailed profile object
        const profile = {
            firstName: user.firstName || 'N/A',
            lastName: user.lastName || 'N/A',
            gender: userDetails.gender || 'N/A',
            dateOfBirth: userDetails.dateOfBirth || 'N/A',
            phone: user.phone || 'N/A',
            email: user.email || 'N/A',
            religion: userDetails?.religion || 'N/A',
            motherTongue: userDetails?.motherTongue || 'N/A',
            city:primaryAddress?.city || 'N/A',
            country: primaryAddress?.country || 'N/A',
            community: userDetails?.community || 'N/A',
            maritalStatus: userDetails?.maritalStatus || 'N/A',
            education: userDetails?.education || 'N/A',
            occupation: userDetails?.occupation || 'N/A',
            annualIncome: userDetails?.annualIncome || 'N/A',
            height: userDetails?.height || 'N/A',
            doYouSmoke: userPreferences?.doYouSmoke || 'N/A',
            doYouDrink: userPreferences?.doYouDrink || 'N/A',
            doYouWorkout: userPreferences?.doYouWorkout || 'N/A',
            havePets: userPreferences?.havePets || 'N/A',
            interestedIn: userPreferences?.interestedIn || 'N/A',
            zodiacSign: userDetails?.zodiacSign || 'N/A',
            lookingFor: userPreferences?.lookingFor || 'N/A',
            sexualOrientation: userPreferences?.sexualOrientation || 'N/A',
        };


        return response.status(200).send(profile);
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).send({ error: 'Failed to fetch user profile' });
    }
}




  /**
   * Upload Photos while editing the profile
   */
    public async uploadUserPhotos({ request, auth, response }: HttpContext) {
      try {
        // Ensure the user is authenticated
        const user = auth.user;
        if (!user) {
          return response.unauthorized({ message: 'User not authenticated' });
        }

        // Retrieve files and upload them to S3
        const photos = request.files('photos', { extnames: ['jpg', 'jpeg', 'png', 'gif'] });
        if (!photos || photos.length === 0) {
          return response.badRequest({ message: 'No photos provided' });
        }
  
        const uploadedUrls = [];
        for (let photo of photos) {
          // Ensure the file is valid
          if (!photo.isValid) {
            return response.badRequest({ message: photo.errors });
          }
  
          // Upload the photo to S3
          const fileStream = photo.tmpPath ? fs.createReadStream(photo.tmpPath) : null;
          const imageUrl = await uploadToS3(photo.clientName, fileStream!);
  
          // Save the photo URL in the database
          const uploadedPhoto = await UserPhoto.create({
            userId: user.id,
            imageUrl,
          });
  
          uploadedUrls.push(uploadedPhoto);
        }
  
        return response.ok({ message: 'Photos uploaded successfully', photos: uploadedUrls });
      } catch (error) {
        console.error('Error uploading photos:', error);
        return response.internalServerError({ message: 'Could not upload photos' });
      }
    
}



    /**
   * Get Photos and display it in profile card
   */
  public async fetchAllPhotos({ response }: HttpContext) {
    try {
      const photos = await UserPhoto.query().select('userId', 'imageUrl');
      
      return response.ok({ photos });
  } catch (error) {
      console.error('Error fetching photos:', error);
      return response.internalServerError({ message: 'Could not fetch photos' });
  }
}
}

