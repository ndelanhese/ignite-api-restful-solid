import { env } from '@env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from '@http/controllers/gyms/routes'
import { usersRoutes } from '@http/controllers/users/routes'
import { checkInsRoutes } from '@http/controllers/checkIns/route'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyCookie, { sign } from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refresh_token',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return response.status(500).send({ message: 'Internal server Error!' })
})
