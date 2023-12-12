import { GymsRepository } from '@repositories/gymsRepository.types'
import type { GymServiceProps } from './createGym.types'

export class GymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: GymServiceProps) {
    return await this.gymsRepository.create({
      description: description ?? null,
      title,
      latitude,
      longitude,
      phone: phone ?? null,
    })
  }
}
