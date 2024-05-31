import InMemoryGymsReposiory from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import CreateGymUseCase from './create-gym'

let inMemoryRepository:InMemoryGymsReposiory
let sut:CreateGymUseCase

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryGymsReposiory()
        sut = new CreateGymUseCase(inMemoryRepository)
    })

    it("should create a new gym", async () => {        

        const { gym } = await sut.execute({
            latitude:-23.3958393,
            longitude:-46.3094439,
            title:'teste', 
            description:null,
            phone:null,
        })

        expect(gym.id).toEqual(expect.any(String));
    })


})