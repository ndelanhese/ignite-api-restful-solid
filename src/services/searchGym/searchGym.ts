import { GymsRepository } from '@repositories/gymsRepository.types'
import type { SearchGymServiceProps } from './searchGym.types'

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page = 1 }: SearchGymServiceProps) {
    return await this.gymsRepository.searchMany(query, page)
  }
}
