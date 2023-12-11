import { describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsErrors } from '@errors/invalidCredentialsErrors'

describe('Authenticate use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('icannotsee', 6),
    })

    const user = await sut.execute({
      email: 'john.doe@email.com',
      password: 'icannotsee',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await expect(() =>
      sut.execute({
        email: 'john.doe@email.com',
        password: 'icannotsee',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('icannotsee', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@email.com',
        password: 'icannotsee123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })
})
