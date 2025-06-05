import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Gym iron',
      phone: null,
      description: null,
      latitude: -21.0675528,
      longitude: -50.1438201,
    })

    await gymsRepository.create({
      title: 'CT Sparta',
      phone: null,
      description: null,
      latitude: -21.0675528,
      longitude: -50.1438201,
    })

    const { gyms } = await sut.execute({
      query: 'CT',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'CT Sparta' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `CT Sparta - ${i}`,
        phone: null,
        description: null,
        latitude: -21.0675528,
        longitude: -50.1438201,
      })
    }

    const { gyms } = await sut.execute({
      query: 'CT',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'CT Sparta - 21' }),
      expect.objectContaining({ title: 'CT Sparta - 22' }),
    ])
  })
})
