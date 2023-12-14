import { makeCheckInsService } from '@/services/factories/makeCheckInService'
import { makeValidateCheckInService } from '@/services/factories/makeValidateCheckInService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const validate = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const createService = makeValidateCheckInService()
  await createService.execute({
    checkInId,
  })
  return response.status(204).send()
}
