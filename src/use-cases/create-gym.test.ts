import { InMemoryGymsRepository } from '@/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsReposository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsReposository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsReposository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Gym',
      phone: null,
      description: null,
      latitude: -21.0675528,
      longitude: -50.1438201,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
