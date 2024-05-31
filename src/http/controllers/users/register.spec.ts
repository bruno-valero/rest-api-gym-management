import app from '@/app'
import { RegisterUseCaseProps } from '@/useCases/register'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Register e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to register", async () => {
        const resp = await request(app.server).post('/users').send(<RegisterUseCaseProps>{
            email:'brunofvn566586@gmail.com',
            name:'bruno',
            password:'123456',
        })

        expect(resp.statusCode).toEqual(201)
    })


})