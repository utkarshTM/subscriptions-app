import type { HttpContext } from '@adonisjs/core/http'
import SocietyBoardMember from '#models/society_board_member'
import SendResponse from '#helpers/send_response_helper'
import {
  createSocietyBoardMemberValidator,
  updateSocietyBoardMemberValidator,
} from '#validators/society_board_member_validator'
import { DateTime } from 'luxon'

export default class SocietyBoardMembersController {
  async index({ response }: HttpContext) {
    try {
      const members = await SocietyBoardMember.query().preload('society').preload('user')
      return response.ok(SendResponse.success('Board members fetched successfully', members))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching members', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const member = await SocietyBoardMember.findOrFail(params.id)
      await member.load('society')
      await member.load('user')
      return response.ok(SendResponse.success('Board member fetched successfully', member))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching member', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSocietyBoardMemberValidator)

      const member = await SocietyBoardMember.create({
        ...data,
        tenureStart: data.tenureStart ? DateTime.fromJSDate(new Date(data.tenureStart)) : undefined,
        tenureEnd: data.tenureEnd ? DateTime.fromJSDate(new Date(data.tenureEnd)) : null,
      })
      return response.created(SendResponse.success('Board member created successfully', member))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating member', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updateSocietyBoardMemberValidator)

      const member = await SocietyBoardMember.findOrFail(params.id)
      member.merge({
        ...data,
        tenureStart: data.tenureStart ? DateTime.fromJSDate(new Date(data.tenureStart)) : undefined,
        tenureEnd: data.tenureEnd ? DateTime.fromJSDate(new Date(data.tenureEnd)) : null,
      })
      await member.save()
      return response.ok(SendResponse.success('Board member updated successfully', member))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating member', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const member = await SocietyBoardMember.findOrFail(params.id)
      await member.delete()
      return response.ok(SendResponse.success('Board member deleted successfully', member))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting member', 500, error.message)
      )
    }
  }
}
