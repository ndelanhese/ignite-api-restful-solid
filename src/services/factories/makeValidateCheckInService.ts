import { PrismaCheckInsRepository } from '@/repositories/prisma/checkInsRepository'
import { ValidateCheckInService } from '../validateCheckIn/validateCheckIn'

export const makeValidateCheckInService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(prismaCheckInsRepository)

  return service
}
