import { InMemoryCheckInsRepository } from '@repositories/inMemory/inMemoryCheckInsRepository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserCheckInsHistoryService } from './userCheckInsHistory'
import { array } from 'zod'

let checkInRepository: InMemoryCheckInsRepository
let sut: UserCheckInsHistoryService

describe('User check-Ins history use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new UserCheckInsHistoryService(checkInRepository)
  })

  it('should be able to fetch check in history', async () => {
    const gymId = randomUUID()
    const anotherGymId = randomUUID()
    const userId = randomUUID()

    await checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    await checkInRepository.create({
      gym_id: anotherGymId,
      user_id: userId,
    })

    const checkIns = await sut.execute({
      userId,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: gymId }),
      expect.objectContaining({ gym_id: anotherGymId }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    const userId = randomUUID()

    for (let index = 1; index <= 22; index++) {
      await checkInRepository.create({
        gym_id: `gym-${index}`,
        user_id: userId,
      })
    }

    const checkIns = await sut.execute({
      userId,
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
