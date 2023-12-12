import { PrismaUsersRepository } from '@repositories/prisma/usersRepository'
import { UserProfileService } from '../userProfile/userProfile'

export const makeUserProfileService = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const userProfileService = new UserProfileService(prismaUsersRepository)

  return userProfileService
}
