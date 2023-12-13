import { PrismaCheckInsRepository } from '@/repositories/prisma/checkInsRepository'
import { UserMetricsService } from '../userMetrics/userMetrics'

export const makeUserMetricsService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const service = new UserMetricsService(prismaCheckInsRepository)

  return service
}
