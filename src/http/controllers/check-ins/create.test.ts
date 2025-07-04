import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticationUser } from '@/utils/tests/create-and-authentication-user'
import request from 'supertest'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create e2e', () => {
  it('should be able create a check-in', async () => {
    const { token } = await createAndAuthenticationUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym',
        latitude: -21.0675528,
        longitude: -50.1438201,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.0675528,
        longitude: -50.1438201,
      })

    expect(response.status).toEqual(201)
  })
})
