import { randomUUID } from 'node:crypto'
import { CheckIn, CheckInsRepository } from '../checkInsRepository.types'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: CheckIn) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
