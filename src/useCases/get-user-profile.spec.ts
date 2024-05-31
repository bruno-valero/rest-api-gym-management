import InMemoryUsersReposiory from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import ResourceNotFoundError from './errors/resource-not-found-error'
import GetUserProfileUseCase from './get-user-profile'

let inMemoryRepository:InMemoryUsersReposiory
let sut:GetUserProfileUseCase


describe('Get User Profile Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryUsersReposiory()
        sut = new GetUserProfileUseCase(inMemoryRepository)
    })

    it("should be able to get a user profile", async () => {        

        inMemoryRepository.create({
            name:'bruno',
            email:'brunofvn6@gmail.com', 
            password_hash: await hash('123456', 6),
        })

        const userCreated = inMemoryRepository.items[0]
        
        const { user } = await sut.execute({ userId:userCreated.id })

        expect(user.name).toEqual('bruno')
    })   

    it("should not be able to get a user profile with wrong id", async () => {        

        inMemoryRepository.create({
            name:'bruno',
            email:'brunofvn6@gmail.com', 
            password_hash: await hash('123456', 6),
        })

        const userCreated = inMemoryRepository.items[0]

        await expect(sut.execute({ userId:'non-existing-id' })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })    


})