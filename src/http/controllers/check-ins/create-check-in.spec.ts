import app from '@/app'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import createCheckInOnTestEnvironment from '@/utils/tests/create-check-in'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Create Check-In e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to create a check in", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')
        const { checkInResponse, gym } = await createCheckInOnTestEnvironment(app, token)
        
        expect(checkInResponse.statusCode).toEqual(200)
        expect(checkInResponse.body).toEqual({
            checkIn:expect.objectContaining({
                id: expect.any(String),
                created_at: expect.any(String),
                validated_at: null,
                user_id: expect.any(String),
                gym_id: gym.id,
            })
        })
        
        


    })


})