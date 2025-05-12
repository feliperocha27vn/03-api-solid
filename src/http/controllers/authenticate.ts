import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()

  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  try {
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
