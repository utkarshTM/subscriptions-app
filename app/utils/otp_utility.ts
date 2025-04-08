import Twilio from 'twilio';
import dotenv from 'dotenv';
import formatPhoneNumber from './phone_utils.js';

dotenv.config();

export async function sendOtpToPhone(phone: string, otp: string): Promise<void> {
  const formattedPhone = formatPhoneNumber(phone); 

  if (!formattedPhone) {
    throw new Error('Invalid phone number format.');
  }

  const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN   
  );

  // Ensure your TWILIO_PHONE_NUMBER is correctly set in .env
  console.log('Sending OTP from:', process.env.TWILIO_PHONE_NUMBER);

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: formattedPhone,
    });
    console.log('OTP sent successfully');
  } catch (error) {
    console.error(`Failed to send OTP. Error: ${error.message}`);
    if (error.code === 21659) {
      console.error('Invalid From number or country mismatch.');
    }
  }
}
