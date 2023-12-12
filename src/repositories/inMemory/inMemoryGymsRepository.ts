import { randomUUID } from 'node:crypto'
import { Gym, GymsRepository } from '../gymsRepository.types'

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
}
