import DatingUserDetail from '#models/dating_user_detail';
import DatingUserValue from '#models/dating_user_value';
import DatingUserPreference from '#models/dating_user_preference';
import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import DatingUserInterest from '#models/dating_user_interest';
// import DatingUserInterest from '#models/dating_user_interest';

export default class DatingUserDetailController {


  /**
   * Fetch dating user details for the authenticated user
   */
  public async fetchDatingUserDetails({ auth, response }: HttpContext) {
    const userId = auth.user?.id; 

    if (!userId) {
      return response.badRequest({ message: 'User not authenticated' });
    }

    try {
      const details = await DatingUserDetail.query().where('user_id', userId).first();
      if (!details) {
        return response.status(404).send({ message: 'Dating details not found.' });
      }

      return response.status(200).send(details);
    } catch (error) {
      console.error('Error fetching dating details:', error);
      return response.status(500).send({ message: 'An error occurred while fetching dating details.' });
    }
  }



  /**
   * Update dating user details for the authenticated user
   */
  public async updateDatingUserDetails({ auth, request, response }: HttpContext) {
    const userId = auth.user?.id; // 
    const { email, gender, pronouns, sexualOrientation, height, heightUnit } = request.only([
      'email', 'gender', 'pronouns', 'sexualOrientation', 'height', 'heightUnit',
    ]);

    if (!userId) {
      return response.badRequest({ message: 'User not authenticated' });
    }

    try {
      let datingDetails = await DatingUserDetail.query().where('user_id', userId).first();

      if (!datingDetails) {
        datingDetails = new DatingUserDetail();
        datingDetails.user_id = userId;
      }

      datingDetails.email = email || datingDetails.email;
      datingDetails.gender = gender || datingDetails.gender;
      datingDetails.pronouns = pronouns ? JSON.stringify(pronouns) : datingDetails.pronouns;
      datingDetails.sexual_orientation = sexualOrientation || datingDetails.sexual_orientation;
      datingDetails.height = height || datingDetails.height;
      datingDetails.height_unit = heightUnit || datingDetails.height_unit;

      await datingDetails.save();

      return response.status(200).send({
        message: 'Dating user details updated successfully.',
        data: datingDetails,
      });
    } catch (error) {
      console.error('Error updating dating details:', error);
      return response.status(500).send({ message: 'An error occurred while updating dating details.' });
    }
  }



   /**
   * Fetch dating user values for the authenticated user
   */
   public async fetchDatingUserValues({ auth, response }: HttpContext) {
    const userId = auth.user?.id; 

    if (!userId) {
      return response.badRequest({ message: 'User not authenticated' });
    }

    try {
      const details = await DatingUserValue.query().where('user_id', userId).first();
      if (!details) {
        return response.status(404).send({ message: 'Dating details not found.' });
      }

      return response.status(200).send(details);
    } catch (error) {
      console.error('Error fetching dating details:', error);
      return response.status(500).send({ message: 'An error occurred while fetching dating details.' });
    }
  }



  /**
   * Update dating user values for the authenticated user
   */
  public async updateDatingUserValues({ auth, request, response }: HttpContext) { 
    const userId = auth.user?.id; 
    const { education, zodiacSign, languages, currentCity } = request.only([
      'education', 'zodiacSign', 'languages', 'currentCity'
    ]);
  
    if (!userId) {
      return response.badRequest({ message: 'User not authenticated' });
    }
  
    try {
      let datingDetails = await DatingUserValue.query().where('user_id', userId).first();
  
      if (!datingDetails) {
        datingDetails = new DatingUserValue();
        datingDetails.user_id = userId;
      }
  
      // Update the dating details
      if (languages) {
        const languagesArray = Array.isArray(languages)
          ? languages
          : languages.split(',').map((lang: string) => lang.trim());
            datingDetails.languages = JSON.stringify(languagesArray); 

      }
      
      datingDetails.education = education || datingDetails.education;
      datingDetails.zodiac_sign = zodiacSign || datingDetails.zodiac_sign;
      datingDetails.current_city = currentCity || datingDetails.current_city;
  
      await datingDetails.save();
  
      return response.status(200).send({
        message: 'Dating user details updated successfully.',
        data: datingDetails,
      });
    } catch (error) {
      console.error('Error updating dating details:', error);
      return response.status(500).send({ message: 'An error occurred while updating dating details.' });
    }
}

   

  /**
   * Fetch dating user preferences for the authenticated user
   */
  public async fetchDatingUserPreferences({ auth, response }: HttpContext) {
    const userId = auth.user?.id; 

    if (!userId) {
      return response.badRequest({ message: 'User not authenticated' });
    }

    try {
      const preferences = await DatingUserPreference.query().where('user_id', userId).first();
      if (!preferences) {
        return response.status(404).send({ message: 'Dating preferences not found.' });
      }

      const parsedPreferences = preferences.serialize();
      return response.status(200).send(parsedPreferences);
    } catch (error) {
      console.error('Error fetching dating preferences:', error);
      return response.status(500).send({ message: 'An error occurred while fetching dating preferences.' });
    }
  }



  /**
 * Update dating user preferences for the authenticated user
 */
public async updateDatingUserPreferences({ auth, request, response }: HttpContext) {
  const userId = auth.user?.id;
  const { relationshipType, valuesInPerson, lifestyleHabits, religion, politics, causes } = request.only([
    'relationshipType', 'valuesInPerson', 'lifestyleHabits', 'religion', 'politics', 'causes',
  ]);

  if (!userId) {
    return response.badRequest({ message: 'User not authenticated' });
  }

  try {
    let preferences = await DatingUserPreference.query().where('user_id', userId).first();

    if (!preferences) {
      preferences = new DatingUserPreference();
      preferences.user_id = userId;
    }
      preferences.relationship_type = Array.isArray(relationshipType)
      ? JSON.stringify(relationshipType)
      : relationshipType;
    
    preferences.values_in_person = Array.isArray(valuesInPerson)
      ? JSON.stringify(valuesInPerson)
      : valuesInPerson;
    
    preferences.lifestyle_habits = typeof lifestyleHabits === 'object'
      ? JSON.stringify(lifestyleHabits)
      : lifestyleHabits;
    
    preferences.causes = Array.isArray(causes)
      ? JSON.stringify(causes)
      : causes;

    preferences.religion = religion || preferences.religion;
    preferences.politics = politics || preferences.politics;

    

    await preferences.save();

    return response.status(200).send({
      message: 'Dating user preferences updated successfully.',
      data: preferences,
    });
  } catch (error) {
    console.error('Error updating dating preferences:', error);
    return response.status(500).send({ message: 'An error occurred while updating dating preferences.' });
  }
}



/**
 * Fetch dating user interests for the authenticated user
 */


public async fetchDatingUserInterests({ auth, response }: HttpContext) {
  const userId = auth.user?.id;

  if (!userId) {
    return response.badRequest({ message: 'User not authenticated' });
  }

  try {
    const interests = await DatingUserInterest.query().where('user_id', userId).first();
    if (!interests) {
      return response.status(404).send({ message: 'User interests not found.' });
    }

    const parsedInterests = interests.serialize();
    return response.status(200).send(parsedInterests);
  } catch (error) {
    console.error('Error fetching user interests:', error);
    return response.status(500).send({ message: 'An error occurred while fetching user interests.' });
  }
}

/**
 * Update dating user interests for the authenticated user
 */
public async updateDatingUserInterests({ auth, request, response }: HttpContext) {
  const userId = auth.user?.id;
  const {
    selfCare, sports, creativity, goingOut, stayingIn, filmAndTV,
    reading, music, foodAndDrink, travelling, pets, personalityAndTraits,
    drinking, smoking
  } = request.only([
    'selfCare', 'sports', 'creativity', 'goingOut', 'stayingIn', 'filmAndTV',
    'reading', 'music', 'foodAndDrink', 'travelling', 'pets', 'personalityAndTraits',
    'drinking', 'smoking'
  ]);

  if (!userId) {
    return response.badRequest({ message: 'User not authenticated' });
  }

  try {
    let interests = await DatingUserInterest.query().where('user_id', userId).first();

    if (!interests) {
      interests = new DatingUserInterest();
      interests.user_id = userId;
    }

    interests.self_care = Array.isArray(selfCare) ? JSON.stringify(selfCare) : '[]';
    interests.sports = Array.isArray(sports) ? JSON.stringify(sports) : '[]';
    interests.creativity = Array.isArray(creativity) ? JSON.stringify(creativity) : '[]';
    interests.going_out = Array.isArray(goingOut) ? JSON.stringify(goingOut) : '[]';
    interests.staying_in = Array.isArray(stayingIn) ? JSON.stringify(stayingIn) : '[]';
    interests.film_and_tv = Array.isArray(filmAndTV) ? JSON.stringify(filmAndTV) : '[]';
    interests.reading = Array.isArray(reading) ? JSON.stringify(reading) : '[]';
    interests.music = Array.isArray(music) ? JSON.stringify(music) : '[]';
    interests.food_and_drink = Array.isArray(foodAndDrink) ? JSON.stringify(foodAndDrink) : '[]';
    interests.travelling = Array.isArray(travelling) ? JSON.stringify(travelling) : '[]';
    interests.pets = Array.isArray(pets) ? JSON.stringify(pets) : '[]';
    interests.personality_and_traits = Array.isArray(personalityAndTraits) ? JSON.stringify(personalityAndTraits) : '[]';
  
    interests.drinking = drinking || interests.drinking;
    interests.smoking = smoking || interests.smoking;

    await interests.save();

    return response.status(200).send({
      message: 'User interests updated successfully.',
      data: interests
    });
  } catch (error) {
    console.error('Error updating user interests:', error);
    return response.status(500).send({ message: 'An error occurred while updating user interests.' });
  }
}




 /**
 * Fetch all dating user's details
 */
async fetchAllDatingUsers({ response }: HttpContext) {
  try {
    const users = await User.query()
      .preload('datingUserDetail') 
      .preload('datingUserInterest') 
      .preload('datingUserPreference') 
      .preload('datingUserValue') 

    const usersData = users.map((user) => {
      const datingUserDetail = user.datingUserDetail || {}
      const datingUserPreference = user.datingUserPreference || {}
      const datingUserValue = user.datingUserValue || {}
      const datingUserInterest = user.datingUserInterest || {}

      return {
        id: user.id,
        firstName: user.firstName || 'N/A',
        lastName: user.lastName || 'N/A',
        dateOfBirth: user.dateOfBirth || 'N/A',
        email: datingUserDetail.email || 'N/A',
        gender: datingUserDetail.gender || 'N/A',
        pronouns: datingUserDetail.pronouns || 'N/A',
        sexualOrientation: datingUserDetail.sexual_orientation || 'N/A',
        height: datingUserDetail.height || 'N/A',
        heightUnit: datingUserDetail.height_unit || 'N/A',

        // Preferences
        relationshipType: datingUserPreference.relationship_type || 'N/A',
        valuesInPerson: datingUserPreference.values_in_person || 'N/A',
        lifestyleHabits: datingUserPreference.lifestyle_habits || 'N/A',
        religion: datingUserPreference.religion || 'N/A',
        politics: datingUserPreference.politics || 'N/A',
        causes: datingUserPreference.causes || 'N/A',
        // Values (Zodiac, Education, Photos, etc.)
        photos: datingUserValue.photos || 'N/A',
        education: datingUserValue.education || 'N/A',
        zodiacSign: datingUserValue.zodiac_sign || 'N/A',
        languages: datingUserValue.languages || 'N/A',
        currentCity: datingUserValue.current_city || 'N/A',
        selfCare: datingUserInterest.self_care || 'N/A',
        sports: datingUserInterest.sports || 'N/A',
        creativity: datingUserInterest.creativity || 'N/A',
        going_out: datingUserInterest.going_out || 'N/A',
        stayingIn: datingUserInterest.staying_in || 'N/A',
        filmAndTV: datingUserInterest.film_and_tv || 'N/A',
        reading: datingUserInterest.reading || 'N/A',
        music: datingUserInterest.music || 'N/A',
        foodAndDrink: datingUserInterest.food_and_drink || 'N/A',
        travelling: datingUserInterest.travelling || 'N/A',
        pets: datingUserInterest.pets || 'N/A',
        personalityAndTraits: datingUserInterest.personality_and_traits || 'N/A',
      }
    })

    // Return the data
    return response.status(200).send(usersData)
  } catch (error) {
    console.error('Error:', error)
    return response.status(500).send({ error: 'Failed to fetch dating users' })
  }
}




/**
 * Fetch logged in dating user's details
 */
public async fetchDatingProfile({ auth, response }: HttpContext) {
  try {
      // Check if the user is authenticated
      const user = auth.user;
      if (!user) {
          return response.status(401).send({
              success: false,
              error: {
                  code: 401,
                  message: 'Unauthorized: User not authenticated',
              },
          });
      }

      // Fetch logged-in user's data with relationships
      const loggedInUser = await User.query()
          .where('id', user.id) 
          .preload('datingUserDetail')
          .preload('datingUserPreference')
          .preload('datingUserValue')
          .first();

      if (!loggedInUser) {
          return response.status(404).send({
              success: false,
              error: {
                  code: 404,
                  message: 'User profile not found',
              },
          });
      }

      // Prepare the detailed profile object
      const profileData = {
          id: loggedInUser.id,
          firstName: loggedInUser.firstName || 'N/A',
          lastName: loggedInUser.lastName || 'N/A',
          dateOfBirth: loggedInUser.dateOfBirth || 'N/A',
          gender: loggedInUser.datingUserDetail?.gender || 'N/A',
          pronouns: loggedInUser.datingUserDetail?.pronouns || 'N/A',
          height: loggedInUser.datingUserDetail?.height || 'N/A',
          heightUnit: loggedInUser.datingUserDetail?.height_unit || 'N/A',
          sexualOrientation: loggedInUser.datingUserDetail?.sexual_orientation || 'N/A',
          zodiacSign: loggedInUser.datingUserValue?.zodiac_sign || 'N/A',
          currentCity: loggedInUser.datingUserValue?.current_city || 'N/A',
          languages: loggedInUser.datingUserValue?.languages?.join(', ') || 'N/A',
          education: loggedInUser.datingUserValue?.education || 'N/A',
          relationshipType: loggedInUser.datingUserPreference?.relationship_type?.join(', ') || 'N/A',
          valuesInPerson: loggedInUser.datingUserPreference?.values_in_person?.join(', ') || 'N/A',
          lifestyleHabits: loggedInUser.datingUserPreference?.lifestyle_habits
              ? Object.values(loggedInUser.datingUserPreference.lifestyle_habits).join(', ')
              : 'N/A',
          religiousBeliefs: loggedInUser.datingUserPreference?.religion || 'N/A',
          politicalViews: loggedInUser.datingUserPreference?.politics || 'N/A',

          selfCare: loggedInUser.datingUserInterest?.self_care || 'N/A',
          sports: loggedInUser.datingUserInterest?.sports || 'N/A',
          creativity: loggedInUser.datingUserInterest?.creativity || 'N/A',
          going_out: loggedInUser.datingUserInterest?.going_out || 'N/A',
          stayingIn: loggedInUser.datingUserInterest?.staying_in || 'N/A',
          filmAndTV: loggedInUser.datingUserInterest?.film_and_tv || 'N/A',
          reading: loggedInUser.datingUserInterest?.reading || 'N/A',
          music: loggedInUser.datingUserInterest?.music || 'N/A',
          foodAndDrink: loggedInUser.datingUserInterest?.food_and_drink || 'N/A',
          travelling: loggedInUser.datingUserInterest?.travelling || 'N/A',
          pets: loggedInUser.datingUserInterest?.pets || 'N/A',
          personalityAndTraits: loggedInUser.datingUserInterest?.personality_and_traits || 'N/A',
      };

      return response.status(200).send({ success: true, data: profileData });
  } catch (error) {
      console.error('Error fetching dating profile:', error);
      return response.status(500).send({
          success: false,
          error: {
              code: 500,
              message: 'Failed to fetch dating profile',
          },
      });
  }
}

}