import { makeNearbyGymsService } from '@/services/factories/makeNearbyGymsService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const nearby = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createGymSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createGymSchema.parse(request.query)

  const service = makeNearbyGymsService()
  const gyms = await service.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return response.status(200).send(gyms)
}
