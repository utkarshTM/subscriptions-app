import Payment from '#models/payment'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import { createPaymentValidator, updatePaymentValidator } from '#validators/payment_validator'
import { DateTime } from 'luxon'

export default class PaymentsController {
  async index({ response }: HttpContext) {
    try {
      const payments = await Payment.query().preload('user').preload('plan')
      return response.ok(SendResponse.success('Payments fetched', payments))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching payments', 500, error.message)
      )
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const payment = await Payment.findOrFail(params.id)
      await payment.load('user')
      await payment.load('plan')

      return response.ok(SendResponse.success('Payment found', payment))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error fetching payment', 500, error.message)
      )
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPaymentValidator)

    try {
      const payment = await Payment.create({
        ...data,
        paymentDate: DateTime.fromJSDate(data.paymentDate),
      })

      return response.created(SendResponse.success('Payment created', payment))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error creating payment', 500, error.message)
      )
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(updatePaymentValidator)

    try {
      const payment = await Payment.findOrFail(params.id)

      payment.merge({
        ...data,
        paymentDate: data.paymentDate ? DateTime.fromJSDate(data.paymentDate) : payment.paymentDate,
      })

      await payment.save()

      return response.ok(SendResponse.success('Payment updated', payment))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error updating payment', 500, error.message)
      )
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const payment = await Payment.findOrFail(params.id)
      await payment.delete()

      return response.ok(SendResponse.success('Payment deleted', payment))
    } catch (error) {
      return response.internalServerError(
        SendResponse.error('Error deleting payment', 500, error.message)
      )
    }
  }
}
