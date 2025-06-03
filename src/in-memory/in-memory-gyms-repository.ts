import type { GymsRepository } from '@/repositories/gyms-repository'
import type { Gym } from '@prisma/client'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findByID(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
