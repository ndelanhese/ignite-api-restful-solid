import { PrismaUsersRepository } from '@repositories/prisma/usersRepository'
import { AuthenticateService } from '../authenticate/authenticate'

export const makeAuthenticateService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(prismaUsersRepository)

  return authenticateService
}
