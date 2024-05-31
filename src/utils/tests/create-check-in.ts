import { CreateGymUseCaseProps } from '@/useCases/create-gym'
import { Gym } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export default async function createCheckInOnTestEnvironment(app:FastifyInstance, token:string) {    

    await request(app.server)
        .post('/gyms/create')
        .set('Authorization', `Bearer ${token}`)
        .send(<CreateGymUseCaseProps>{
            description:'a random description',
            phone:null,
            latitude:-23.3960282,
            longitude:-46.3101967,
            title:'near gym 1'
    }) 

    const gymResponse = await request(app.server)
        .get('/gyms/search?query=gym&page=1')
        .set('Authorization', `Bearer ${token}`)
        .send()

    console.log(`gymResponse.statusCode`, gymResponse.statusCode)
    console.log(`token`, token)
    const gym = gymResponse.body.gyms[0] as Gym
    console.log(`gym.id`, gym.id)
    
    /*
        userLatitude=-23.3960282
        userLongitude=-46.3101967
    */
    const checkInResponse = await request(app.server)
        .get(`/gyms/${gym.id}/create-check-in?userLatitude=-23.3960282&userLongitude=-46.3101967`)
        .set('Authorization', `Bearer ${token}`)
        .send() 

    return { checkInResponse, gym }

}