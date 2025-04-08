import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'
import User from '#models/user'
import AccessToken from '#models/access_token'
import { Exception } from '@adonisjs/core/exceptions'
import env from '#start/env'
import { HttpContext } from '@adonisjs/core/http'

const secret = env.get('APP_KEY') as string

export class Auth {
  /**
   * Create a JWT token for a user.
   */
  static async createToken(user: User): Promise<string> {
    try {
      const token = await AccessToken.create({
        userId: user.id,
        expiresAt: DateTime.now().plus({ days: 10 }), 
      })

      return jwt.sign(
        {
          userId: user.id,
          tokenId: token.id,
        },
        secret,
        {
          expiresIn: '10d', 
        }
      )
    } catch (error) {
      throw new Exception('Failed to create token', error)
    }
  }

  /**
   * Verify a JWT token and return the authenticated user.
   */
  static async verifyToken(token: string): Promise<{ user: User } | null> {
    try {
      const decoded = jwt.verify(token, secret)
      return jwt.verify(token, secret, async (err, decoded: any) => {
        if (err) {
          console.error('Token verification failed:', err)
          return null
        }

        const accessToken = await AccessToken.findOrFail(decoded.tokenId)

        if (accessToken.expiresAt && accessToken.expiresAt < DateTime.now()) {
          console.error('Token has expired')
          return null
        }

        const user = await User.findOrFail(accessToken.userId)
        return { user }
      }) as unknown as Promise<{ user: User } | null>
    } catch (error) {
      console.error('Token verification error:', error)
      return null
    }
  }

  

  /**
   * Decode a JWT token without verifying its signature.
   */
  static async decodeToken(token: string): Promise<AccessToken> {
    const decodedToken = jwt.decode(token) as { tokenId: number }
    const accessToken = await AccessToken.findOrFail(decodedToken.tokenId)
    return accessToken
  }

  /**
   * Extract the Bearer token from the Authorization header.
   */
  static getTokenFromHeader(header: string): string {
    return header.split(' ')[1]
  }

  /**
   * Get the token ID from a JWT token.
   */
  static getTokenId(token: string): number {
    const decodedToken = jwt.decode(token) as { tokenId: number }
    return decodedToken.tokenId
  }

  /**
   * Get the current access token based on the HTTP request.
   */
  static async getCurrentAccessToken(request: HttpContext['request']): Promise<AccessToken> {
    const token = this.getTokenFromHeader(request.headers().authorization || '')
    if (!token) {
      throw new Exception('Token not found')
    }
    const tokenId = this.getTokenId(token)
    return AccessToken.findOrFail(tokenId)
  }

  /**
   * Get all access tokens for a specific user.
   */
  static async getUserAccessTokens(user: User): Promise<AccessToken[]> {
    return AccessToken.query().where('userId', user.id).exec()
  }

  /**
   * Get an access token by ID.
   */
  static async getAccessTokenById(id: number): Promise<AccessToken> {
    return AccessToken.findOrFail(id)
  }
}
