import app from '@/app'
import { CreateGymUseCaseProps } from '@/useCases/create-gym'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Create Gym e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to get a Gym", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')
        
        const resp = await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:null,
                phone:null,
                latitude:-23.4857346,
                longitude:-46.5410302,
                title:'gym 1'
            })

        expect(resp.statusCode).toEqual(201)
    })


})