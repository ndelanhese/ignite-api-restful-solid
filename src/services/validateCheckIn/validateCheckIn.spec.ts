import { InMemoryCheckInsRepository } from '@repositories/inMemory/inMemoryCheckInsRepository'
import { randomUUID } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInService } from './validateCheckIn'
import { ResourceNotFoundErrors } from '@errors/resourceNotFound'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validade check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    })

    const checkIn = await sut.execute({
      checkInId: createdCheckIn.id ?? '',
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
