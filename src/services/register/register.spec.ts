import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@repositories/inMemory/inMemoryUsersRepository'
import { UserAlreadyExistsError } from '@errors/userAlreadyExists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should has user password upon registration', async () => {
    const { password_hash: passwordHash } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    })

    const isPasswordCorrectlyHashed = await compare('icannotsee', passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should has not be able to register with same email twice', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    }

    await sut.execute(user)

    await expect(() => sut.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
