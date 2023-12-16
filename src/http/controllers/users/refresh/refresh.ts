import { makeUserProfileService } from '@/services/factories/makeUserProfileService'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const userService = makeUserProfileService()
  const user = await userService.execute({ id: request.user.sub })

  const token = await response.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await response.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return response
    .setCookie('refresh_token', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
