import app from '@/app'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import createCheckInOnTestEnvironment from '@/utils/tests/create-check-in'
import dayjs from 'dayjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Validate Check-In e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to validate a check in", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')
        const { checkInResponse, gym } = await createCheckInOnTestEnvironment(app, token)
        
        const resp = await request(app.server)
            .patch(`/check-ins/${checkInResponse.body.checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        const historyResp = await request(app.server)
            .get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(resp.statusCode).toEqual(204)
        const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');
        const regex = new RegExp(formattedDate)

        expect(historyResp.body).toEqual({
            checkIns:[
                expect.objectContaining({
                    validated_at: expect.stringMatching(regex),
                })
            ]
        })
        
        


    })


})