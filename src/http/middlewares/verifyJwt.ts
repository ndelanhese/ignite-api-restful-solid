import type { FastifyReply, FastifyRequest } from 'fastify'

export const verifyJWT = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized access!' })
  }
}
