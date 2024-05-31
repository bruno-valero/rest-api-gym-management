import InMemoryCheckInsReposiory from '@/repositories/in-memory/in-memory-check-ins-repository'
import InMemoryGymsReposiory from '@/repositories/in-memory/in-memory-gyms-repository'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CheckInUseCase from './check-in'
import MaxDistanceError from './errors/max-distance-error'
import MaxNumberOfCheckInsError from './errors/max-number-of-check-ins-error'

let checkInsRepoitory:InMemoryCheckInsReposiory
let gymsRepoitory:InMemoryGymsReposiory
let sut:CheckInUseCase


describe('Check-In Use Case', () => {

    beforeEach(async () => {
        checkInsRepoitory = new InMemoryCheckInsReposiory()
        gymsRepoitory = new InMemoryGymsReposiory()
        sut = new CheckInUseCase(checkInsRepoitory, gymsRepoitory)

        await gymsRepoitory.create({ 
            latitude:-23.3958393,
            longitude:-46.3094439,
            title:'teste',   
            description:null,
            phone:null,         
        })
        // loc teste da academia -23.3958393,-46.3094439
        // loc do usuario -23.3960282, -46.3101967

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to check in", async () => {  
        
        const gymId = gymsRepoitory.items[0].id

        const { checkIn } = await sut.execute({ 
            gymId,
            userId:randomUUID(),
            userLatitude:-23.3960282,
            userLongitude:-46.3101967,
        })
        // -23.3960282, -46.3101967
        
        

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should not be able to check in twice in the same day", async () => { 
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))        
        
        const gymId = gymsRepoitory.items[0].id
        const userId = randomUUID()        
           
        const { checkIn } = await sut.execute({ 
            gymId,
            userId,
            userLatitude:-23.3960282,
            userLongitude:-46.3101967,
        })
        // -23.3960282, -46.3101967

        console.log(checkIn.created_at)

        await expect(
            sut.execute({ 
                gymId,
                userId,
                userLatitude:-23.3960282,
                userLongitude:-46.3101967,
            })
            // -23.3960282, -46.3101967
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it("should be able to check in twice in different days", async () => { 
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        
        const gymId = gymsRepoitory.items[0].id
        const userId = randomUUID()        

        const { checkIn } = await sut.execute({ 
            gymId,
            userId,
            userLatitude:-23.3960282,
            userLongitude:-46.3101967,
        })
        // -23.3960282, -46.3101967

        console.log(checkIn.created_at)

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn:ck2 } = await sut.execute({ 
            gymId,
            userId,
            userLatitude:-23.3960282,
            userLongitude:-46.3101967,
        })
        // -23.3960282, -46.3101967

        expect(ck2.id).toEqual(expect.any(String))
    })

    it("should not be able to check on a distant gym", async () => { 
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await gymsRepoitory.create({ 
            latitude:-23.3960106,
            longitude:-46.3083269,
            title:'teste', 
            description:null,
            phone:null,             
        })
        // -23.3960106,-46.3083269
        
        const gymId = gymsRepoitory.items[1].id
        const userId = randomUUID()   
        
        
        await expect(
            sut.execute({ 
                gymId,
                userId,
                userLatitude:-23.3960282,
                userLongitude:-46.3101967,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)

        // -23.3960282, -46.3101967

    })


})