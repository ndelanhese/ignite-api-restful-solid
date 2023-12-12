import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInService } from './checkIn'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Authenticate use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('should be able to check in', async () => {
    const checkIn = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
