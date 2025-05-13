import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByID(id: string): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  create(data: Prisma.UserCreateInput): Promise<User>
}
