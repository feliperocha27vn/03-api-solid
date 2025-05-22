import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInsRepository } from '@/in-memory/in-memory-checkin-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: '01',
      userId: '01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: '01',
      userId: '01',
    })

    await expect(() =>
      sut.execute({
        gymId: '01',
        userId: '01',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
