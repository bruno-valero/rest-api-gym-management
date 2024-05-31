import app from '@/app'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import createCheckInOnTestEnvironment from '@/utils/tests/create-check-in'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'


describe('Fetch User Check-In History e2e', () => {

    beforeAll(async () => {
        await app.ready()
        vi.useFakeTimers()
    })

    afterAll(async () => {
        await app.close()
        vi.useRealTimers()
    })

    
    it("should be able to fetch a user Check-In History", async () => {
        
        vi.setSystemTime(new Date(2022, 0, 20, 10, 0, 0))

        const { token, cookie } = await createAndAuthenticateUser(app, 'ADMIN')
        const { checkInResponse:resp1, gym:gym1 } = await createCheckInOnTestEnvironment(app, token)


        vi.setSystemTime(new Date(2022, 0, 21, 10, 0, 0))

        const refreshResp = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookie ?? [''])
        .send()
        
        const refreshToken = refreshResp.body.token
        
        const { checkInResponse:resp2, gym:gym2 } = await createCheckInOnTestEnvironment(app, refreshToken)

        console.log('resps:', [resp1.body.checkIn.id, resp2.body?.checkIn?.id])
        
        const resp = await request(app.server)
        .get(`/check-ins/history`)
        .set('Authorization', `Bearer ${refreshToken}`)
        .send()
        
        expect(resp.statusCode).toEqual(200)
        expect(resp.body.checkIns).toHaveLength(2)
        expect(resp.body).toEqual({
            checkIns: [
                expect.objectContaining({
                    id: expect.any(String),
                    created_at: expect.any(String),
                    validated_at: null,
                    user_id: expect.any(String),
                    gym_id: expect.any(String),
                }),

                expect.objectContaining({
                    id: expect.any(String),
                    created_at: expect.any(String),
                    validated_at: null,
                    user_id: expect.any(String),
                    gym_id: expect.any(String),
                }),
            ]
        })
        
        


    })


})