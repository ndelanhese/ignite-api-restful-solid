import { InMemoryCheckInsRepository } from '@repositories/inMemory/inMemoryCheckInsRepository'
import { randomUUID } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInService } from './validateCheckIn'
import { ResourceNotFoundErrors } from '@errors/resourceNotFound'
import { LateCheckInValidationError } from '@errors/lateCheckInValidationError'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validade check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    const year = 2022
    const monthIndex = 0
    const day = 20
    const hours = 13
    const minutes = 40
    vi.setSystemTime(new Date(year, monthIndex, day, hours, minutes))

    const createdCheckIn = await checkInRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    })

    const TWENTY_ONE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 21
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MILLISECONDS)

    await expect(async () =>
      sut.execute({
        checkInId: createdCheckIn.id ?? '',
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
