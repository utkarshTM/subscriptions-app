import { DateTime } from 'luxon'
import crypto from 'crypto'
import { sendOtpToPhone } from '#utils/otp_utility'
import Otp from '#models/otp'

export class OtpService {
  static generateOtp() {
    return crypto.randomInt(100000, 999999).toString()
  }

  static async sendOtp(phone: string) {
    const otp = this.generateOtp()
    const expiresAt = DateTime.local().plus({ minutes: 5 })

  //   // Save OTP to the database
  //   await Otp.create({
  //     phone,
  //     otp,
  //     expiresAt,
  //   })

  //   // Send OTP to the user's phone (via an external service like Twilio)
  //   sendOtpToPhone(phone, otp)
  // }
    // Save OTP to the database
    await Otp.create({
      phone,
      otp,
      expiresAt,
    });
  
    console.log(`Simulated OTP for ${phone}: ${otp}`);
  
    return otp; 
  }

  static async verifyOtp(phone: string, otp: string) {
    const otpRecord = await Otp.query()
      .where('phone', phone)
      .where('otp', otp)
      .where('expires_at', '>', DateTime.local().toSQL())
      .first()

    if (!otpRecord) {
      throw new Error('Invalid or expired OTP')
    }

    // OTP is valid, remove it from the database after successful verification
    await otpRecord.delete()
  }
}
