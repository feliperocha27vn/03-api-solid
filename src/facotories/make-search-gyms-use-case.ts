import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { SearchGymUseCase } from '@/use-cases/search-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
