import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const userEmail = 'johndoe@example.com'
    const userPassword = '123456'

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: userEmail,
      password: userPassword,
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: userEmail,
      password: userPassword,
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: userEmail,
      }),
    )
  })
})
