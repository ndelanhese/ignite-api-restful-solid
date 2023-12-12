import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkInsRepository.types'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    return null
  }
}
