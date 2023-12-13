import { GymsRepository } from '@repositories/gymsRepository.types'
import type { NearbyGymsServiceProps } from './nearbyGyms.types'

export class NearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: NearbyGymsServiceProps) {
    return await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
  }
}
