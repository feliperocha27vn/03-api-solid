import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUSerProfileUseCase } from '@/use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUSerProfileUseCase(usersRepository)

  return useCase
}
