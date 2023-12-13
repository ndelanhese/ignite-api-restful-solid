import { PrismaGymsRepository } from '@/repositories/prisma/gymsRepository'
import { SearchGymService } from '../searchGym/searchGym'

export const makeSearchGymsService = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new SearchGymService(prismaGymsRepository)

  return service
}
