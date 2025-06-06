import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      phone: null,
      description: null,
      latitude: -21.0675528,
      longitude: -50.1438201,
    })

    await gymsRepository.create({
      title: 'Far gym',
      phone: null,
      description: null,
      latitude: -21.1854461,
      longitude: -49.5790612,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.0675528,
      userLongitude: -50.1438201,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
