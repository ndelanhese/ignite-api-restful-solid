import { UsersRepository } from '@repositories/usersRepository.types'

import { ResourceNotFoundErrors } from '../errors/resourceNotFound'
import {
  userProfileServiceProps,
  userProfileServiceResponse,
} from './userProfile.type'

export class UserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: userProfileServiceProps): Promise<userProfileServiceResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundErrors()
    }

    return user
  }
}
