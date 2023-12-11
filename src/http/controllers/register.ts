import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { UserAlreadyExistsError } from '@/services/errors/userAlreadyExists'
import { RegisterService } from '@/services/register/register'
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
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)
    await registerService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }
    throw error
  }
}
