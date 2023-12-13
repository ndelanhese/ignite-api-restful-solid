import { PrismaGymsRepository } from '@/repositories/prisma/gymsRepository'
import { GymService } from '../createGym/createGym'

export const makeCreateGymService = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new GymService(prismaGymsRepository)

  return service
}
