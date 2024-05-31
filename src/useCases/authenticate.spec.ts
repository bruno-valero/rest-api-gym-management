import InMemoryUsersReposiory from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import AuthenticateUseCase from './authenticate'
import InvalidCredentialsError from './errors/invalid-credentials-error'

let inMemoryRepository:InMemoryUsersReposiory
let sut:AuthenticateUseCase


describe('Authenticate Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryUsersReposiory()
        sut = new AuthenticateUseCase(inMemoryRepository)
    })

    it("should be able to athenticate", async () => {        

        inMemoryRepository.create({
            name:'bruno',
            email:'brunofvn6@gmail.com', 
            password_hash: await hash('123456', 6),
        })
        
        const { user } = await sut.execute({ 
            email:'brunofvn6@gmail.com', 
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should not be able to athenticate with wrong email", async () => {        

        inMemoryRepository.create({
            name:'bruno',
            email:'brunofvn7@gmail.com', 
            password_hash: await hash('123456', 6),
        })
        
        await expect(
            sut.execute({ 
                email:'brunofvn6@gmail.com', 
                password:'123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

        
    })


    it("should not be able to athenticate with wrong password", async () => {        

        inMemoryRepository.create({
            name:'bruno',
            email:'brunofvn6@gmail.com', 
            password_hash: await hash('123456', 6),
        })
        
        await expect(
            sut.execute({ 
                email:'brunofvn6@gmail.com', 
                password:'1234567'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

        
    })


})