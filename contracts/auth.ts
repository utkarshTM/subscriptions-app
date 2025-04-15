import AccessToken from '#models/access_token'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    accessToken: AccessToken
  }
}
