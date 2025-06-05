import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/in-memory/in-memory-checkin-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Register use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: '01',
      user_id: '01',
    })

    await checkInsRepository.create({
      gym_id: '012',
      user_id: '01',
    })

    const { checkInsCount } = await sut.execute({
      userId: '01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
