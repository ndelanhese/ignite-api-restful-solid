import { PrismaUsersRepository } from '@repositories/prisma/usersRepository'
import { RegisterService } from '@services/register/register'

export const makeRegisterService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(prismaUsersRepository)

  return registerService
}
