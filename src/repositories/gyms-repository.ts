import type { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findByID(id: string): Promise<Gym | null>

  create(data: Prisma.GymCreateInput): Promise<Gym>
}
