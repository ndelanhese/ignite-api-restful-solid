import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin = false,
) => {
  const userEmail = 'johndoe@example.com'
  const userPassword = '123456'

  await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: userEmail,
      password: userPassword,
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    })

  const authResponse = await request(app.server).post('/sessions').send({
    email: userEmail,
    password: userPassword,
  })

  const { token } = authResponse.body
  return { token, userEmail, userPassword }
}
