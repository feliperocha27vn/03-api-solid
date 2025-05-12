import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/in-memory/in-memory-user-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'

let usersReposository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersReposository = new InMemoryUserRepository()
    sut = new RegisterUseCase(usersReposository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    const isPasswordHashed = await compare('12345', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
