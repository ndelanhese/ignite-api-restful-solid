import { UsersRepository } from '@repositories/usersRepository.types'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/userAlreadyExists'
import type { RegisterServiceProps } from './register.types'

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    role = 'MEMBER',
  }: RegisterServiceProps) {
    const rounds = 6
    const passwordHash = await hash(password, rounds)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    return await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
      role,
    })
  }
}
