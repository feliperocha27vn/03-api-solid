import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'
import { FetchNearbyGymUseCase } from '@/use-cases/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
