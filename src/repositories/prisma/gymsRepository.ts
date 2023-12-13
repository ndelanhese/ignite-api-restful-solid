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

  async searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  async findManyNearby(params: findManyNearbyProps): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
}
