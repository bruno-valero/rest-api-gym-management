import app from '@/app'
import { CreateGymUseCaseProps } from '@/useCases/create-gym'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Fetch Nearby Gyms e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to Fetch Nearby Gyms", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.4327641,
                longitude:-46.269491,
                title:'near gym 1'
        })

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.4857346,
                longitude:-46.5410302,
                title:'far gym 2'
        })

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.3847381,
                longitude:-46.26633,
                title:'near academy 1'
        })
        /*
            userLatitude=-23.3960282
            userLongitude=-46.3101967
        */
        const resp = await request(app.server)
            .get('/gyms/nearby?userLatitude=-23.3960282&userLongitude=-46.3101967')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(resp.statusCode).toEqual(200)
        expect(resp.body.nearByGyms).toHaveLength(2)
        expect(resp.body).toEqual({
            nearByGyms:[
                expect.objectContaining({
                    title:expect.stringMatching(/near/)
                }),
                expect.objectContaining({
                    title:expect.stringMatching(/near/)
                }),
            ]
        })        


    })


})