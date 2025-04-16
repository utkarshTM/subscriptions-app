import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import AccessToken from '#models/access_token'
import { DateTime } from 'luxon'
import crypto from 'crypto'

export default class UserService {
  /**
   * Generate a secure random token
   */
  static generateSecureToken(): string {
    return crypto.randomBytes(64).toString('hex')
  }

  /**
   * Authenticate user by email and password
   */
  static async authenticate(email: string, password: string) {
    const user = await User.query().where('email', email).preload('role').preload('society').first()

    if (!user) {
      return { success: false, reason: 'User not found' }
    }

    const isPasswordValid = await hash.verify(user.passwordHash, password)

    if (!isPasswordValid) {
      return { success: false, reason: 'Invalid password' }
    }

    return { success: true, user }
  }

  /**
   * Create a new access token for a user
   */
  static async createToken(userId: number) {
    const token = await AccessToken.create({
      userId,
      token: this.generateSecureToken(),
      expiresAt: DateTime.now().plus({ days: 7 }),
    })

    return token
  }

  /**
   * Create a new user
   */
  static async createUser(payload: any) {
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      roleId: payload.roleId,
      societyId: payload.societyId,
      passwordHash: payload.password,
    })

    return user
  }

  /**
   * Serialize user object and remove sensitive info
   */
  static serializeUser(user: User) {
    const userData = user.serialize()
    delete userData.passwordHash
    return userData
  }
}
