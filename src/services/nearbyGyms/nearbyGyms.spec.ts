import { InMemoryGymsRepository } from '@repositories/inMemory/inMemoryGymsRepository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { NearbyGymsService } from './nearbyGyms'

let gymsRepository: InMemoryGymsRepository
let sut: NearbyGymsService

describe('Search nearby gyms repository use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new NearbyGymsService(gymsRepository)
  })

  it('should be able to search nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      latitude: -24.0209828,
      longitude: -53.4483632,
      description: 'fake gym description',
      phone: '9999999',
    })

    await gymsRepository.create({
      title: 'Far gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: 'another fake gym description',
      phone: '9999999',
    })

    const nearbyGyms = await sut.execute({
      userLatitude: -24.0209828,
      userLongitude: -53.4483632,
    })

    expect(nearbyGyms).toHaveLength(1)
    expect(nearbyGyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
