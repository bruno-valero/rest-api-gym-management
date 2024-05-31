import { AuthenticateUseCaseRequest } from '@/useCases/authenticate'
import { RegisterUseCaseProps } from '@/useCases/register'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export default async function createAndAuthenticateUser(app:FastifyInstance, role?: 'ADMIN' | 'MEMBER') {

    const resp = await request(app.server).post('/users').send(<RegisterUseCaseProps>{
        email:'brunofvn566586@gmail.com',
        name:'bruno',
        password:'123456',
        role
    })

    const sessionResp = await request(app.server).post('/sessions').send(<AuthenticateUseCaseRequest>{
        email:'brunofvn566586@gmail.com',            
        password:'123456',
    })

    const { body:{ token } } = sessionResp

    const cookie = sessionResp.get('Set-Cookie')

    return { token, cookie }

}