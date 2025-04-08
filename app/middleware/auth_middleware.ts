import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { Auth } from '#utils/auth'

interface AuthRequest extends Request {
  isAuthenticated: boolean
}

export default class AuthMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    try {
      // Extract the token from the Authorization header
      const token = Auth.getTokenFromHeader(ctx.request.headers().authorization || '')

      if (!token) {
        return ctx.response.status(401).send({
          success: false,
          error: {
            code: 401,
            message: 'Unauthorized: No token provided',
          },
        })
      }
      

      // Verify the token and get the user
      const auth = await Auth.verifyToken(token)

      if (!auth) {
        return ctx.response.status(401).send({
          success: false,
          error: {
            code: 401,
            message: 'Unauthorized: Invalid token',
          },
        })
      }

      // Attach the authenticated user to the context
      (ctx.request.qs() as unknown as AuthRequest).isAuthenticated = true
ctx.auth=auth
      // Proceed to next middleware or route handler
      return next()
      
    } catch (error) {
      console.error('Authentication error:', error)
      return ctx.response.status(401).send({
        success: false,
        error: {
          code: 401,
          message: 'Unauthorized: Authentication failed',
        },
      })
    }
  }
}
