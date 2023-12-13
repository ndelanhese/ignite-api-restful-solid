import { CheckIn } from '@repositories/checkInsRepository.types'

export type UserCheckInsHistoryProps = {
  userId: string
  page?: number
}

export type UserCheckInsHistoryResponse = CheckIn[]
