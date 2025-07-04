import { makeCheckInUseCase } from '@/facotories/make-check-in-use.case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
