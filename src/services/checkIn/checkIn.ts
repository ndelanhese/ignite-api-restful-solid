import { CheckInsRepository } from '@repositories/checkInsRepository.types'
import { checkInServiceProps, checkInServiceResponse } from './checkIn.type'

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: checkInServiceProps): Promise<checkInServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return checkIn
  }
}
