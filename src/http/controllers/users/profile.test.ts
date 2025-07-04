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
  it('should be able to login', async () => {
    const { token } = await createAndAuthenticationUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      })
    )
  })
})
