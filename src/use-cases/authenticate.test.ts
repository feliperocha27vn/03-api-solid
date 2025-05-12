import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUserRepository } from '@/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(
      sut.execute({
        email: 'email-invalido@example.com',
        password: '1234546',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authentication with wrong password', async () => {
    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
