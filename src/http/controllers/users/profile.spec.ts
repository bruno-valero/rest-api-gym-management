import app from '@/app'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Profile e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to get a User Profile", async () => {
        
        const { token } = await createAndAuthenticateUser(app)

        const resp = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            user:expect.objectContaining({
                email:'brunofvn566586@gmail.com',
                name:'bruno',
                created_at:expect.any(String),
                id:expect.any(String),
            })
        })
    })


})