import type { FastifyReply, FastifyRequest } from 'fastify'

export const verifyUserRole = (roleToVerify: 'ADMIN' | 'MEMBER') => {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const { role } = request.user

    if (!role || role !== roleToVerify)
      return response.status(401).send({ message: 'Unauthorized access!' })
  }
}
