import { CheckIn } from '@repositories/checkInsRepository.types'

export type checkInServiceProps = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export type checkInServiceResponse = CheckIn
