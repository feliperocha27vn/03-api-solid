import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInsRepository } from '@/in-memory/in-memory-checkin-repository'
import { InMemoryGymsRepository } from '@/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: '01',
      title: 'gym',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      descripton: '',
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: '01',
        userId: '01',
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
