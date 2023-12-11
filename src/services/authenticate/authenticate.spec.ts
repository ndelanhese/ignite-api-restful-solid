import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsErrors } from '@errors/invalidCredentialsErrors'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
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
    await expect(() =>
      sut.execute({
        email: 'john.doe@email.com',
        password: 'icannotsee',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })

  it('should not be able to authenticate with wrong email', async () => {
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
