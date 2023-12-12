import { PrismaUsersRepository } from '@repositories/prisma/prismaUsersRepository'
import { AuthenticateService } from '../authenticate/authenticate'

export const makeAuthenticateService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(prismaUsersRepository)

  return authenticateService
}
