import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
  app.get('/check-in/history', history)
  app.get('/check-ins/metrics', metrics)
}
