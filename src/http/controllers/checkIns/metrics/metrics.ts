import { makeUserMetricsService } from '@/services/factories/makeUserMetricsService'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const metrics = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const service = makeUserMetricsService()
  const checkInsCount = await service.execute({
    userId: request.user.sub,
  })
  return response.status(200).send(checkInsCount)
}
