import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { CheckIn, CheckInsRepository } from '../checkInsRepository.types'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data,
    })
  }
}
