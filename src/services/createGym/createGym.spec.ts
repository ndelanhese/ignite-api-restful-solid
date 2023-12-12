import { InMemoryGymsRepository } from '@repositories/inMemory/inMemoryGymsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GymService } from './createGym'

let gymsRepository: InMemoryGymsRepository
let sut: GymService

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const gym = await sut.execute({
      title: 'Fake Gym',
      latitude: -24.0209828,
      longitude: -53.4483632,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
