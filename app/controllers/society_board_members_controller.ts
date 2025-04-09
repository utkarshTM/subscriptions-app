import SocietyBoardMember from '#models/society_board_member'
import {
  createSocietyBoardMemberValidator,
  updateSocietyBoardMemberValidator,
} from '#validators/society_board_member_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocietyBoardMembersController {
  async index({ params, response }: HttpContext) {
    try {
      const boardMembers = await SocietyBoardMember.query()
        .where('society_id', params.societyId)
        .preload('society')
        .preload('user')

      return response
        .status(200)
        .send(SendResponse.success('Board members fetched successfully', boardMembers))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch board members', 500, error.message))
    }
  }
}
