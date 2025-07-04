import { app } from '@/app'
import { createAndAuthenticationUser } from '@/utils/tests/create-and-authentication-user'
import request from 'supertest'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register e2e', () => {
  it('should be able create a gym', async () => {
    const { token } = await createAndAuthenticationUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym',
        phone: null,
        description: null,
        latitude: -21.0675528,
        longitude: -50.1438201,
      })

    expect(response.status).toEqual(201)
  })
})
