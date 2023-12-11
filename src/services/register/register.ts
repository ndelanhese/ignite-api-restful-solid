import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { RegisterServiceProps } from './register.types'
import { PrismaUsersRepository } from '@repositories/prismaUsersRepository'

export const registerService = async ({
  email,
  name,
  password,
}: RegisterServiceProps) => {
  const rounds = 6
  const passwordHash = await hash(password, rounds)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists!')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  prismaUsersRepository.create({
    email,
    name,
    password_hash: passwordHash,
  })
}
