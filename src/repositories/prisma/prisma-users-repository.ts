import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../user-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
