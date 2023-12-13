import { CheckInsRepository } from '@repositories/checkInsRepository.types'

import { ResourceNotFoundErrors } from '@errors/resourceNotFound'
import {
  ValidateCheckInProps,
  ValidateCheckInResponse,
} from './validateCheckIn.type'

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInProps): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundErrors()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return checkIn
  }
}
