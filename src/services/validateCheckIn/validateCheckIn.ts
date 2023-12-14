import { CheckInsRepository } from '@repositories/checkInsRepository.types'

import { ResourceNotFoundErrors } from '@errors/resourceNotFound'
import {
  ValidateCheckInProps,
  ValidateCheckInResponse,
} from './validateCheckIn.type'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from '@errors/lateCheckInValidationError'

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInProps): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundErrors()
    }

    const DISTANCE_IN_MINUTES_FROM_CHECK_IN_CREATION = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    )

    if (DISTANCE_IN_MINUTES_FROM_CHECK_IN_CREATION > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return checkIn
  }
}
