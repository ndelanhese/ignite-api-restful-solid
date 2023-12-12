import { FastifyInstance } from 'fastify'
import { register } from '@http/controllers/register'
import { authenticate } from '@http/controllers/authenticate'
import { userProfile } from '@http/controllers/userProfile'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/user-profile', userProfile)
}
