import type { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findByID(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
