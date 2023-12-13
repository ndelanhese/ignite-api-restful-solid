import { makeUserProfileService } from '@/services/factories/makeUserProfileService'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { sub: userId } = request.user

  const getUserProfile = makeUserProfileService()

  const profile = await getUserProfile.execute({
    id: userId,
  })

  return response.status(200).send({ ...profile, password_hash: undefined })
}
