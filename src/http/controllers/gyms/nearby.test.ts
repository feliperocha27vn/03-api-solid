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

describe('Nearby e2e', () => {
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticationUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Iron academia',
        phone: null,
        description: null,
        latitude: -21.0675528,
        longitude: -50.1438201,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym flix',
        phone: null,
        description: null,
        latitude: -21.1854461,
        longitude: -49.5790612,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -21.0675528,
        longitude: -50.1438201,
      })

    expect(response.status).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Iron academia',
      }),
    ])
  })
})
