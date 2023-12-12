import { CheckInsRepository } from '@repositories/checkInsRepository.types'
import { checkInServiceProps, checkInServiceResponse } from './checkIn.type'
import { GymsRepository } from '@repositories/gymsRepository.types'

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: checkInServiceProps): Promise<checkInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new SpeechRecognitionResultList()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return checkIn
  }
}
