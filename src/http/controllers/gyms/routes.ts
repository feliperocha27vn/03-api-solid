import { verifyJwt } from '@/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
}
