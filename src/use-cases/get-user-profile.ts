import type { UsersRepository } from '@/repositories/user-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUSerProfileUseCaseRequest {
  userId: string
}

interface GetUSerProfileUseCaseResponse {
  user: User
}

export class GetUSerProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUSerProfileUseCaseRequest): Promise<GetUSerProfileUseCaseResponse> {
    const user = await this.usersRepository.findByID(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
