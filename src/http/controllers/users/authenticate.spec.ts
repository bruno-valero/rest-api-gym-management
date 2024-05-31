import app from '@/app'
import { AuthenticateUseCaseRequest } from '@/useCases/authenticate'
import { RegisterUseCaseProps } from '@/useCases/register'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Authenticate e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to authenticate", async () => {
        const registerResp = await request(app.server).post('/users').send(<RegisterUseCaseProps>{
            email:'brunofvn566586@gmail.com',
            name:'bruno',
            password:'123456',
        })

        const resp = await request(app.server).post('/sessions').send(<AuthenticateUseCaseRequest>{
            email:'brunofvn566586@gmail.com',            
            password:'123456',
        })

        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            token:expect.any(String)
        })
    })


})