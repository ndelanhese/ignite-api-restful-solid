import { authenticate } from '@/http/controllers/users/authenticate'
import { register } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'
import { profile } from '@/http/controllers/users/profile'
import { verifyJWT } from '@http/middlewares/verifyJwt'
import { refresh } from '@/http/controllers//users/refresh'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  //* AUTHENTICATED *//
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile,
  )
}
