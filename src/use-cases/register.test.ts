import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/in-memory/in-memory-user-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    const isPasswordHashed = await compare('12345', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
