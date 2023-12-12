import { InvalidCredentialsErrors } from '@services/errors/invalidCredentialsErrors'
import { makeUserProfileService } from '@services/factories/makeUserProfileService'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const userProfile = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const userProfileUserSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = userProfileUserSchema.parse(request.body)

  try {
    const userProfileService = makeUserProfileService()
    await userProfileService.execute({ id })
    return response.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsErrors) {
      return response.status(400).send({ message: error.message })
    }
    throw error
  }
}
