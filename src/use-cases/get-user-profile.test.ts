import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/in-memory/in-memory-user-repository'
import { GetUSerProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUserRepository
let sut: GetUSerProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUSerProfileUseCase(usersRepository)
  })

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'non-exists-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to get user profile', async () => {
    const userCreated = usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      userId: (await userCreated).id,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
