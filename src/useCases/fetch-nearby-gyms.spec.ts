import InMemoryGymsReposiory from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import FetchNearByGymsUseCase from './fetch-nearby-gyms'

let inMemoryRepository:InMemoryGymsReposiory
let sut:FetchNearByGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryGymsReposiory()
        sut = new FetchNearByGymsUseCase(inMemoryRepository)
    })

    it("should be able to return a list of nearby gyms", async () => {  
        
        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:-23.4327641,
            longitude:-46.269491,
            title:'Near Gym 1'
        })
        // loc teste da academia a menos de 10Km -23.4327641,-46.269491

        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:-23.3847381,
            longitude:-46.26633,
            title:'Near Gym 2'
        })
        // loc teste da academia a menos de 10Km -23.3847381,-46.26633

        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:-23.4857346,
            longitude:-46.5410302,
            title:'Far Gym 1'
        })
        // loc teste da academia a mais de 10Km -23.4857346,-46.5410302
        

        const { nearByGyms } = await sut.execute({ userLatitude:-23.3960282, userLongitude:-46.3101967 })
        // loc do usuario -23.3960282, -46.3101967

        expect(nearByGyms).toHaveLength(2)
        expect(nearByGyms).toEqual([
            expect.objectContaining({ title:'Near Gym 1' }),
            expect.objectContaining({ title:'Near Gym 2' }),
        ]);

        
    })    


})