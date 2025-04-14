import vine from '@vinejs/vine'

export const createPaymentValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    planId: vine.number().exists(async (db, value) => {
      const plan = await db.from('plans').where('id', value).first()
      return !!plan
    }),
    proofType: vine.enum(['transaction_id', 'receipt_no', 'screenshot', 'other']),
    proofValue: vine.string().trim(),
    discountApplied: vine.number().min(0).optional(),
    paymentDate: vine.date(),
    financialYear: vine.string().trim(),
    verifiedByAdmin: vine.boolean().optional(),
    isAdvancePayment: vine.boolean().optional(),
  })
)

export const updatePaymentValidator = vine.compile(
  vine.object({
    proofType: vine.enum(['transaction_id', 'receipt_no', 'screenshot', 'other']).optional(),
    proofValue: vine.string().trim().optional(),
    discountApplied: vine.number().min(0).optional(),
    paymentDate: vine.date().optional(),
    financialYear: vine.string().trim().optional(),
    verifiedByAdmin: vine.boolean().optional(),
    isAdvancePayment: vine.boolean().optional(),
  })
)
