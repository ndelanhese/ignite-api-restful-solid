import { InMemoryGymsRepository } from '@repositories/inMemory/inMemoryGymsRepository'
import { randomUUID } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './checkIn'
import { InMemoryCheckInsRepository } from '@repositories/inMemory/inMemoryCheckInsRepository'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Authenticate use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const gymId = randomUUID()

    await gymsRepository.create({
      description: 'description',
      id: gymId,
      latitude: 0,
      longitude: 0,
      phone: '(99) 9999-9999',
      title: 'Fake Gym',
    })

    const checkIn = await sut.execute({
      gymId,
      userId: randomUUID(),
      userLatitude: -24.0209828,
      userLongitude: -53.4483632,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    const userId = randomUUID()
    const gymId = randomUUID()

    await gymsRepository.create({
      description: 'description',
      id: gymId,
      latitude: 0,
      longitude: 0,
      phone: '(99) 9999-9999',
      title: 'Fake Gym',
    })

    await sut.execute({
      gymId,
      userId,
      userLatitude: -24.0209828,
      userLongitude: -53.4483632,
    })

    await expect(
      sut.execute({
        gymId,
        userId,
        userLatitude: -24.0209828,
        userLongitude: -53.4483632,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    const userId = randomUUID()
    const gymId = randomUUID()

    await gymsRepository.create({
      description: 'description',
      id: gymId,
      latitude: 0,
      longitude: 0,
      phone: '(99) 9999-9999',
      title: 'Fake Gym',
    })

    const year = 2022
    const monthIndex = 0
    const day = 20
    const hours = 8
    vi.setSystemTime(new Date(year, monthIndex, day, hours))

    await sut.execute({
      gymId,
      userId,
      userLatitude: -24.0209828,
      userLongitude: -53.4483632,
    })

    vi.setSystemTime(new Date(year, monthIndex, day + 1, hours))

    const newCheckIn = await sut.execute({
      gymId,
      userId,
      userLatitude: -24.0209828,
      userLongitude: -53.4483632,
    })

    expect(newCheckIn.id).toEqual(expect.any(String))
  })
})
