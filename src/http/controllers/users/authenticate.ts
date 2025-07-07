import { makeAuthenticationUseCase } from '@/facotories/make-authenticantion-use-case'
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

  const authenticateUseCase = makeAuthenticationUseCase()

  try {
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .send({ token })
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
