import type { UsersRepository } from '@/repositories/user-repository'
import type { Prisma, User } from '@prisma/client'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async findByID(id: string) {
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
