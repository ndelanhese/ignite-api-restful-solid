import { randomUUID } from 'node:crypto'
import {
  Gym,
  GymsRepository,
  findManyNearbyProps,
} from '../gymsRepository.types'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Gym) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      description: data.description,
      title: data.title,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: findManyNearbyProps): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      )

      return distance < 10
    })
  }
}
