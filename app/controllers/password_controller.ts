import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'
import { HttpContext } from '@adonisjs/core/http'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/password_validator'
import MailerService from '#services/mailer_service'
import { DateTime } from 'luxon'

export default class PasswordController {
  private mailerService = new MailerService()

  /**
   * Generate a 6-digit OTP
   */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  /**
   * Handle forgot password request
   */
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    // Find user by email
    const user = await User.findBy('email', email)
    if (!user) {
      // Return same response whether user exists or not for security
      return response.ok({
        success: true,
        message: 'If an account with that email exists, we have sent a password reset OTP',
      })
    }

    // Generate OTP and expiration time (15 minutes from now)
    const otp = this.generateOtp()
    const expiresAt = DateTime.now().plus({ minutes: 15 })

    // Create or update password reset token
    await PasswordResetToken.updateOrCreate(
      { email },
      {
        userId: user.id,
        email,
        token: otp,
        expiresAt,
      }
    )

    // Send email with OTP
    await this.mailerService.sendPasswordResetOtp(user, otp)

    return response.ok({
      success: true,
      message: 'If an account with that email exists, we have sent a password reset OTP',
    })
  }

  /**
   * Verify OTP and reset password
   */
  async resetPassword({ request, response }: HttpContext) {
    const { email, token, password } = await request.validateUsing(resetPasswordValidator)

    // Find the token record
    const tokenRecord = await PasswordResetToken.query()
      .where('email', email)
      .where('token', token)
      .where('expires_at', '>', DateTime.now().toSQL())
      .first()

    if (!tokenRecord) {
      return response.badRequest({
        success: false,
        error: {
          code: 400,
          message: 'Invalid or expired OTP',
        },
      })
    }

    // Find user by email
    const user = await User.findBy('email', email)
    if (!user) {
      return response.notFound({
        success: false,
        error: {
          code: 404,
          message: 'User not found',
        },
      })
    }

    // Update user's password
    user.passwordHash = password
    await user.save()

    // Delete the used token
    await tokenRecord.delete()

    return response.ok({
      success: true,
      message: 'Password reset successfully',
    })
  }
}
