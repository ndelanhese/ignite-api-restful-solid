import { prisma } from '@lib/prisma'
import {
  Gym,
  GymsRepository,
  findManyNearbyProps,
} from '../gymsRepository.types'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Gym): Promise<Gym> {
    return await prisma.gym.create({
      data,
    })
  }

  async searchMany(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyProps) {
    return await prisma.$queryRaw<Gym[]>`
   SELECT * from gyms
   WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
   `
  }
}
