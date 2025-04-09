import vine from '@vinejs/vine'

export const createPaymentValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    planId: vine.number(),
    proofType: vine.enum(['transaction_id', 'receipt_no', 'screenshot', 'other']),
    proofValue: vine.string(),
    discountApplied: vine.number().min(0).optional(),
    paymentDate: vine.date(),
    financialYear: vine.string(),
    isAdvancePayment: vine.boolean().optional(),
  })
)
