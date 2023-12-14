import { authenticate } from '@http/controllers/authenticate'
import { register } from '@http/controllers/register'
import { FastifyInstance } from 'fastify'
import { profile } from '@http/controllers/profile'
import { verifyJWT } from '@http/middlewares/verifyJwt'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  //* AUTHENTICATED *//
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile,
  )
}
