import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/in-memory/in-memory-checkin-repository'
import { FetchUserCehckInsUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCehckInsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCehckInsUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: '01',
      user_id: '01',
    })

    await checkInsRepository.create({
      gym_id: '012',
      user_id: '01',
    })

    const { checkIns } = await sut.execute({
      userId: '01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '01' }),
      expect.objectContaining({ gym_id: '012' }),
    ])
  })

  it('should be able to fetch check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: '01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: '01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
