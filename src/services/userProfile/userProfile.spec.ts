import { InMemoryUsersRepository } from '@repositories/inMemory/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundErrors } from '@services/errors/resourceNotFound'
import { UserProfileService } from '@services/userProfile/userProfile'

let usersRepository: InMemoryUsersRepository
let sut: UserProfileService

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('icannotsee', 6),
    })

    const user = await sut.execute({
      id: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
