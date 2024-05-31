import app from '@/app'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import createCheckInOnTestEnvironment from '@/utils/tests/create-check-in'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Fetch User Metrics e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to Fetch User Metrics", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')
        await createCheckInOnTestEnvironment(app, token)
        
        const resp = await request(app.server)
            .get('/users/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            checkInsCount:1,
        })
        
        


    })


})