import { InvalidCredentialsErrors } from '@services/errors/invalidCredentialsErrors'
import { makeAuthenticateService } from '@services/factories/makeAuthenticateService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const authenticateUserSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({ email, password })
    return response.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsErrors) {
      return response.status(400).send({ message: error.message })
    }
    throw error
  }
}
