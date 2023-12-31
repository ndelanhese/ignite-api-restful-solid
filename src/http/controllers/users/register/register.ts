import { makeRegisterService } from '@services/factories/makeRegisterService'
import { UserAlreadyExistsError } from '@services/errors/userAlreadyExists'
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
    role: z.enum(['ADMIN', 'MEMBER']).default('MEMBER'),
  })

  const { email, name, password, role } = createUserSchema.parse(request.body)

  try {
    const registerService = makeRegisterService()
    await registerService.execute({ name, email, password, role })
    return response.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }
    throw error
  }
}
