import { makeCheckInsService } from '@/services/factories/makeCheckInService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createService = makeCheckInsService()
  await createService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return response.status(204).send()
}
