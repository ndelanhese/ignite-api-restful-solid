import { UsersRepository } from '@repositories/usersRepository.types'
import {
  AuthenticateServiceProps,
  AuthenticateServiceResponse,
} from './authenticate.type'
import { InvalidCredentialsErrors } from '@errors/invalidCredentialsErrors'
import { compare } from 'bcryptjs'

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceProps): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsErrors()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsErrors()
    }

    return user
  }
}
