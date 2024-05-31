import app from '@/app'
import { AuthenticateUseCaseRequest } from '@/useCases/authenticate'
import { RegisterUseCaseProps } from '@/useCases/register'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Refresh e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("should be able to refresh a token", async () => {
        const registerResp = await request(app.server).post('/users').send(<RegisterUseCaseProps>{
            email:'brunofvn566586@gmail.com',
            name:'bruno',
            password:'123456',
        })

        const authResp = await request(app.server).post('/sessions').send(<AuthenticateUseCaseRequest>{
            email:'brunofvn566586@gmail.com',            
            password:'123456',
        })

        const cookies = authResp.get('Set-Cookie')

        const resp = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies ?? [''])
            .send()

        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            token:expect.any(String)
        })
        expect(resp.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })


})