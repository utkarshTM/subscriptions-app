// app/middleware/auth_middleware.ts
import { HttpContext } from '@adonisjs/core/http'
import AccessToken from '#models/access_token'
import { DateTime } from 'luxon'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const authHeader = ctx.request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.response.unauthorized({
        success: false,
        error: { code: 401, message: 'Unauthorized: No token provided' },
      })
    }

    const token = authHeader.substring(7)
    const accessToken = await AccessToken.query().where('token', token).preload('user').first()

    if (!accessToken || (accessToken.expiresAt && accessToken.expiresAt < DateTime.now())) {
      return ctx.response.unauthorized({
        success: false,
        error: { code: 401, message: 'Invalid or expired token' },
      })
    }

    ctx.auth = { user: accessToken.user } as any

    ctx.accessToken = accessToken

    await next()
  }
}
