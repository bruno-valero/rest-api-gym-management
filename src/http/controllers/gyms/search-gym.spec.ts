import app from '@/app'
import { CreateGymUseCaseProps } from '@/useCases/create-gym'
import createAndAuthenticateUser from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Search Gym e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to search a Gym", async () => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN')

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.4857346,
                longitude:-46.5410302,
                title:'gym 1'
        })

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.4857346,
                longitude:-46.5410302,
                title:'gym 2'
        })

        await request(app.server)
            .post('/gyms/create')
            .set('Authorization', `Bearer ${token}`)
            .send(<CreateGymUseCaseProps>{
                description:'a random description',
                phone:null,
                latitude:-23.4857346,
                longitude:-46.5410302,
                title:'academy 1'
        })

        const resp = await request(app.server)
            .get('/gyms/search?query=gym&page=1')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(resp.statusCode).toEqual(200)
        expect(resp.body.gyms).toHaveLength(2)
        expect(resp.body).toEqual({
            gyms:[
                expect.objectContaining({
                    latitude:"-23.4857346",
                    longitude:"-46.5410302",
                    title:expect.any(String)
                }),
                expect.objectContaining({
                    latitude:"-23.4857346",
                    longitude:"-46.5410302",
                    title:expect.any(String)
                }),
            ]
        })

        const resp2 = await request(app.server)
            .get('/gyms/search?query=academy&page=1')
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(resp2.statusCode).toEqual(200)
        expect(resp2.body.gyms).toHaveLength(1)
        expect(resp2.body).toEqual({
            gyms:[
                expect.objectContaining({
                    latitude:"-23.4857346",
                    longitude:"-46.5410302",
                    title:'academy 1'
                }),
            ]
        })


    })


})