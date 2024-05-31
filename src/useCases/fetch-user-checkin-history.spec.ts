import InMemoryCheckInsReposiory from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import FetchUserCheckInHistoryUseCase from './fetch-user-checkin-history'

let checkInsRepository:InMemoryCheckInsReposiory
let sut:FetchUserCheckInHistoryUseCase


describe('Fetch User Check-In History Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsReposiory()
        sut = new FetchUserCheckInHistoryUseCase(checkInsRepository)
    })

    it("should be able to list a user's check-ins history", async () => {        

        const gym_id = randomUUID()
        const user_id = randomUUID()

        const gym_id_2 = randomUUID()
        
        await checkInsRepository.create({
            gym_id,
            user_id,
        }) 

        await checkInsRepository.create({
            gym_id:gym_id_2,
            user_id,
        })  
        
        // console.log(`checkInsRepository.items`, checkInsRepository.items)
        
        const { checkIns } = await sut.execute({ userId:user_id, page:1 })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id:gym_id }),
            expect.objectContaining({ gym_id:gym_id_2 })
        ])
    })    

    it("should be able  fetach a paginated list of a user's check-ins history", async () => {        

        const gym_id:Record<string, string> = {}
        const user_id = randomUUID()

        for (let i = 1; i <= 22; i++) {
            gym_id[`${i}`] = randomUUID()
            await checkInsRepository.create({
                gym_id:gym_id[`${i}`],
                user_id,
            })
        }
        
        // console.log(`checkInsRepository.items`, checkInsRepository.items)
        
        const { checkIns } = await sut.execute({ userId:user_id, page:2 })
        // console.log(`checkIns:`, checkIns)
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id:gym_id['21'] }),
            expect.objectContaining({ gym_id:gym_id['22'] })
        ])

        
    })       


})