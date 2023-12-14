import { makeCreateGymService } from '@/services/factories/makeCreateGymService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, phone, title } =
    createGymSchema.parse(request.body)

  const createService = makeCreateGymService()
  await createService.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })
  return response.status(201).send()
}
