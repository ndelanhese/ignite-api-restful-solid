import { PrismaGymsRepository } from '@/repositories/prisma/gymsRepository'
import { NearbyGymsService } from '../nearbyGyms/nearbyGyms'

export const makeNearbyGymsService = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const service = new NearbyGymsService(prismaGymsRepository)

  return service
}
