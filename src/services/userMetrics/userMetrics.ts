import { CheckInsRepository } from '@repositories/checkInsRepository.types'
import { userMetricsProps, userMetricsResponse } from './userMetrics.type'

export class UserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: userMetricsProps): Promise<userMetricsResponse> {
    const checkIns = await this.checkInsRepository.countByUserId(userId)

    return checkIns
  }
}
