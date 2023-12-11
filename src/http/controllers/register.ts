import { registerService } from '@/services/register/register'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const register = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, name, password } = createUserSchema.parse(request.body)

  try {
    await registerService({ name, email, password })
  } catch (error) {
    return response.status(409).send()
  }

  return response.status(201).send()
}
