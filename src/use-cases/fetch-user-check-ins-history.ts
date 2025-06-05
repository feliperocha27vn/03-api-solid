import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCehckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCehckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCehckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCehckInsUseCaseRequest): Promise<FetchUserCehckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyUserId(userId, page)

    return {
      checkIns,
    }
  }
}
