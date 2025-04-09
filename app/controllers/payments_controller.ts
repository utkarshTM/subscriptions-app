import Payment from '#models/payment'
import { createPaymentValidator } from '#validators/payment_validator'
import SendResponse from '#helpers/send_response_helper'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class PaymentsController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createPaymentValidator)

      const payment = await Payment.create({
        ...payload,
        paymentDate: DateTime.fromJSDate(new Date(payload.paymentDate)),
      })
      return response
        .status(201)
        .send(SendResponse.success('Payment submitted successfully', payment))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to submit payment', 500, error.message))
    }
  }

  async index({ response }: HttpContext) {
    try {
      const payments = await Payment.query().preload('user').preload('plan')
      return response
        .status(200)
        .send(SendResponse.success('Payments fetched successfully', payments))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to fetch payments', 500, error.message))
    }
  }

  async verify({ params, response }: HttpContext) {
    try {
      const payment = await Payment.findOrFail(params.id)
      payment.verifiedByAdmin = true
      await payment.save()
      return response
        .status(200)
        .send(SendResponse.success('Payment verified successfully', payment))
    } catch (error) {
      return response
        .status(500)
        .send(SendResponse.error('Failed to verify payment', 500, error.message))
    }
  }
}
