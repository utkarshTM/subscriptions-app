// import mail from '@adonisjs/mail/services/main'
// import env from '#start/env'
// import User from '#models/user'

// export default class MailerService {
//   async sendPasswordResetEmail(user: User, token: string) {
//     const resetUrl = `${env.get('FRONTEND_URL')}/reset-password?token=${token}`

//     await mail.send((message) => {
//       message
//         .to(user.email)
//         .from(env.get('SMTP_FROM_ADDRESS'), env.get('SMTP_FROM_NAME'))
//         .subject('Password Reset Request')
//         .htmlView('emails/password_reset', { user, token, resetUrl })
//     })
//   }

//   async sendPasswordResetOtp(user: User, otp: string) {
//     await mail.send((message) => {
//       message
//         .to(user.email)
//         .from(env.get('SMTP_FROM_ADDRESS'), env.get('SMTP_FROM_NAME'))
//         .subject('Your Password Reset OTP')
//         .htmlView('emails/password_reset_otp', { user, otp })
//     })
//   }
// }
// app/services/mailer_service.ts
// app/services/mailer_service.ts
// app/services/mailer_service.ts
// app/services/mailer_service.ts
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import User from '#models/user'

export default class MailerService {
  private getPasswordResetTemplate(user: User, otp: string): string {
    const appName = env.get('APP_NAME', 'Subscription App')

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset OTP</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          height: 40px;
        }
        .otp-box {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          text-align: center;
          margin: 20px 0;
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://debutify-dev-theme.s3.amazonaws.com/assets/images/DbtfyLogo.png" 
             alt="${appName} Logo" class="logo">
      </div>
      
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>Use the following OTP to reset your password:</p>
      
      <div class="otp-box">${otp}</div>
      
      <p>This OTP is valid for 15 minutes. If you didn't request this, please ignore this email.</p>
      
      <div class="footer">
        © ${new Date().getFullYear()} ${appName}. All rights reserved.
      </div>
    </body>
    </html>
    `
  }

  async sendPasswordResetOtp(user: User, otp: string) {
    const html = this.getPasswordResetTemplate(user, otp)

    await mail.send((message) => {
      message
        .to(user.email)
        .from(env.get('SMTP_FROM_ADDRESS'), env.get('SMTP_FROM_NAME'))
        .subject(`${env.get('APP_NAME', 'Subscription App')} - Password Reset OTP`)
        .html(html)
    })
  }
}
