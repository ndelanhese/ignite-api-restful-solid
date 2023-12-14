import { makeCheckInsHistoryService } from '@/services/factories/makeCheckInsHistory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const history = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const historyGymSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyGymSchema.parse(request.query)

  const service = makeCheckInsHistoryService()
  const checkIns = await service.execute({
    page,
    userId: request.user.sub,
  })
  return response.status(200).send(checkIns)
}
