import { makeSearchGymsService } from '@/services/factories/makeSearchGymService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const search = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createGymSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = createGymSchema.parse(request.query)

  const service = makeSearchGymsService()
  const gyms = await service.execute({
    query: q,
    page,
  })
  return response.status(200).send(gyms)
}
