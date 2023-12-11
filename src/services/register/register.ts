import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { RegisterServiceProps } from './register.types'
import { UsersRepository } from '@repositories/usersRepository'
import { UserAlreadyExistsError } from '../errors/userAlreadyExists'

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterServiceProps) {
    const rounds = 6
    const passwordHash = await hash(password, rounds)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })
  }
}
