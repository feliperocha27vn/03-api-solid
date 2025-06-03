import type { Gym } from '@prisma/client'

export interface GymsRepository {
  findByID(id: string): Promise<Gym | null>
}
