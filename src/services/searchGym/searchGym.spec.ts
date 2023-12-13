import { InMemoryGymsRepository } from '@repositories/inMemory/inMemoryGymsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymService } from './searchGym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gyms repository use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'A fake gym',
      latitude: -24.0209828,
      longitude: -53.4483632,
      description: 'fake gym description',
      phone: '9999999',
    })

    await gymsRepository.create({
      title: 'Another fake gym',
      latitude: -24.0209828,
      longitude: -53.4483632,
      description: 'another fake gym description',
      phone: '9999999',
    })

    const checkIns = await sut.execute({
      query: 'Another',
    })

    expect(checkIns).toHaveLength(1)
    expect(checkIns).toEqual([
      expect.objectContaining({ title: 'Another fake gym' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `A fake gym-${index}`,
        latitude: -24.0209828,
        longitude: -53.4483632,
        description: 'fake gym description',
        phone: '9999999',
      })
    }

    const checkIns = await sut.execute({
      query: 'fake',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ title: 'A fake gym-21' }),
      expect.objectContaining({ title: 'A fake gym-22' }),
    ])
  })
})
