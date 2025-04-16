// app/validators/password_validator.ts

import vine from '@vinejs/vine'

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    token: vine.string(),
    password: vine.string().minLength(6).confirmed(),
  })
)
