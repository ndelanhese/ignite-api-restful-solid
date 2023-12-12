import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { User, UsersRepository } from '../usersRepository.types'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
