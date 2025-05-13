import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authentication with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'email-invalido@example.com',
        password: '1234546',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authentication with wrong password', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'email-invalido@example.com',
        password: '1234546',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
