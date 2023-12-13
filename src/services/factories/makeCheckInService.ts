import { PrismaCheckInsRepository } from '@repositories/prisma/checkInsRepository'
import { CheckInService } from '../checkIn/checkIn'
import { PrismaGymsRepository } from '@repositories/prisma/gymsRepository'

export const makeCheckInsService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()

  const service = new CheckInService(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return service
}
