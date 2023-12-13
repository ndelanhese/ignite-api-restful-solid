import { InMemoryCheckInsRepository } from '@repositories/inMemory/inMemoryCheckInsRepository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserMetricsService } from './userMetrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: UserMetricsService

describe('User metrics use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new UserMetricsService(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
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

    expect(checkIns).toEqual(2)
  })
})
