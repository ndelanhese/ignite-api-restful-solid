import { CheckInsRepository } from '@repositories/checkInsRepository.types'
import { checkInServiceProps, checkInServiceResponse } from './checkIn.type'
import { GymsRepository } from '@repositories/gymsRepository.types'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'
import { MaxDistanceError } from '../errors/maxDistanceError'
import { MaxNumberOfCheckInsError } from '../errors/maxNumberOfCheckInsError'

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: checkInServiceProps): Promise<checkInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new SpeechRecognitionResultList()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return checkIn
  }
}
