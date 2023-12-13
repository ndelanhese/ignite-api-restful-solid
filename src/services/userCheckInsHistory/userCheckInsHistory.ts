import { CheckInsRepository } from '@repositories/checkInsRepository.types'
import {
  UserCheckInsHistoryProps,
  UserCheckInsHistoryResponse,
} from './userCheckInsHistory.type'

export class UserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: UserCheckInsHistoryProps): Promise<UserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return checkIns
  }
}
