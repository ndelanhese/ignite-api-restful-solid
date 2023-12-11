import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@repositories/inMemory/inMemoryUsersRepository'
import { UserAlreadyExistsError } from '@errors/userAlreadyExists'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should has user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const { password_hash: passwordHash } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    })

    const isPasswordCorrectlyHashed = await compare('icannotsee', passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should has not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const user = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'icannotsee',
    }

    await registerUseCase.execute(user)

    await expect(() => registerUseCase.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
