import { authenticate } from '@http/controllers/authenticate'
import { register } from '@http/controllers/register'
import { FastifyInstance } from 'fastify'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verifyJwt'

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
