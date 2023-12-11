import type { User } from '@repositories/usersRepository.types'

export type AuthenticateServiceProps = {
  email: string
  password: string
}

export type AuthenticateServiceResponse = User
