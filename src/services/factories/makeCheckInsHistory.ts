import { PrismaCheckInsRepository } from '@/repositories/prisma/checkInsRepository'
import { UserCheckInsHistoryService } from '../userCheckInsHistory/userCheckInsHistory'

export const makeCheckInsHistoryService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const service = new UserCheckInsHistoryService(prismaCheckInsRepository)

  return service
}
