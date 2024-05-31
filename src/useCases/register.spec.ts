import InMemoryUsersReposiory from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import UserAlreadyExistsError from './errors/user-already-exists-error'
import RegisterUseCase from './register'

let inMemoryRepository:InMemoryUsersReposiory
let sut:RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryUsersReposiory()
        sut = new RegisterUseCase(inMemoryRepository)
    })

    it("should hash user's password upon registration", async () => {        

        const { user } = await sut.execute({
            email:'brunofvn20@gmail.com',
            name:'bruno',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true);
    })

    it("should not be able to register same email twice", async () => {

        const email = 'brunofvn20@gmail.com'
        
        const { user } = await sut.execute({
            email,
            name:'bruno',
            password:'123456'
        })

        await expect(
            () => sut.execute({
                email,
                name:'bruno',
                password:'123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    it("should be able to register", async () => {

        const email = 'brunofvn20@gmail.com'
        
        const { user } = await sut.execute({
            email,
            name:'bruno',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


})