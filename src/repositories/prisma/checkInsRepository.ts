import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { CheckIn, CheckInsRepository } from '../checkInsRepository.types'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async save(data: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }

  async findManyByUserId(userId: string, page = 1) {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({ where: { user_id: userId } })
  }

  async findById(checkInId: string) {
    return await prisma.checkIn.findUnique({ where: { id: checkInId } })
  }
}
