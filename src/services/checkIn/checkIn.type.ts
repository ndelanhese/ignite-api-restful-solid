import { CheckIn } from '@repositories/checkInsRepository.types'

export type checkInServiceProps = {
  userId: string
  gymId: string
}

export type checkInServiceResponse = CheckIn
