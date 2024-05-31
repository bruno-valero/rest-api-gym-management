import InMemoryGymsReposiory from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import SearchGymsUseCase from './search-gyms'

let inMemoryRepository:InMemoryGymsReposiory
let sut:SearchGymsUseCase

describe('Search Gyms Use Case', () => {

    beforeEach(() => {
        inMemoryRepository = new InMemoryGymsReposiory()
        sut = new SearchGymsUseCase(inMemoryRepository)
    })

    it("should be able to return a gym list by name", async () => {  
        
        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:0,
            longitude:0,
            title:'gym 1'
        })

        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:0,
            longitude:0,
            title:'gym 1'
        })

        inMemoryRepository.create({
            description:null,
            phone:null,
            latitude:0,
            longitude:0,
            title:'gym 2'
        })

        const { gyms:gyms1 } = await sut.execute({ query:'gym 1', page:1 })
        const { gyms:gyms2 } = await sut.execute({ query:'gym 2', page:1 })

        expect(gyms1).toHaveLength(2)
        expect(gyms1).toEqual([
            expect.objectContaining({ title:'gym 1' }),
            expect.objectContaining({ title:'gym 1' }),
        ]);

        expect(gyms2).toHaveLength(1)
        expect(gyms2).toEqual([
            expect.objectContaining({ title:'gym 2' }),
        ]);
    })

    it("should be able to return a gym list by name paginated", async () => {  
                
        for (let i = 1; i <= 22; i++) {
            inMemoryRepository.create({
                description:null,
                phone:null,
                latitude:0,
                longitude:0,
                title:`gym ${i}`
            })
        }


        const { gyms:gyms1 } = await sut.execute({ query:'gym', page:1 })
        expect(gyms1).toHaveLength(20)

        const { gyms:gyms2 } = await sut.execute({ query:'gym', page:2 })        
        expect(gyms2).toHaveLength(2)   
        expect(gyms2).toEqual([
            expect.objectContaining({ title:'gym 21' }),
            expect.objectContaining({ title:'gym 22' }),
        ]);            

    })


})