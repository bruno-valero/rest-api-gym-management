import InMemoryCheckInsReposiory from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LateCheckInValidationError from './errors/late-check-in-validation-error'
import ResourceNotFoundError from './errors/resource-not-found-error'
import ValidateCheckInUseCase from './validate-check-in'

let checkInsRepoitory:InMemoryCheckInsReposiory
let sut:ValidateCheckInUseCase


describe('Validate Check-In Use Case', () => {

    beforeEach(async () => {
        checkInsRepoitory = new InMemoryCheckInsReposiory()
        sut = new ValidateCheckInUseCase(checkInsRepoitory)        

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to validate a check in", async () => {  
        
        const gym_id = randomUUID()
        const gym_id2 = randomUUID()

        const createdCheckIn = await checkInsRepoitory.create({ 
            gym_id,
            user_id:randomUUID(),
        })

        const createdCheckIn2 = await checkInsRepoitory.create({ 
            gym_id:gym_id2,
            user_id:randomUUID(),
        })

        const { checkIn:validatedCheckin } = await sut.execute({ checkInId:createdCheckIn.id })
        
        

        expect(validatedCheckin.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepoitory.items[0].validated_at).toEqual(expect.any(Date))
        expect(createdCheckIn2.validated_at).toEqual(null)
    })  

    it("should no be able to validate an inexistent check in", async () => {        
        
        

        await expect(
            sut.execute({ checkInId:'inextintent check-in id' })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })   

    it("should no be able to validate a check in after 20 minutes after it's creation", async () => {        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        const gym_id = randomUUID()
        const gym_id2 = randomUUID()

        const createdCheckIn = await checkInsRepoitory.create({ 
            gym_id,
            user_id:randomUUID(),
        })

        const createdCheckIn2 = await checkInsRepoitory.create({ 
            gym_id:gym_id2,
            user_id:randomUUID(),
        })

        // fazendo checkin 19 minutos apos sua criacao
        const nineteenMinutesInMs = 1000 * 60 * 19
        vi.advanceTimersByTime(nineteenMinutesInMs)
        // vi.setSystemTime(new Date(2022, 0, 20, 8, 19, 0))
        
        const { checkIn:validatedCheckin } = await sut.execute({ checkInId:createdCheckIn.id })                
        expect(validatedCheckin.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepoitory.items[0].validated_at).toEqual(expect.any(Date))        
        
        
        // fazendo checkin 21 minutos apos sua criacao
        const threeMinutesInMs = 1000 * 60 * 3
        vi.advanceTimersByTime(threeMinutesInMs)
        // vi.setSystemTime(new Date(2022, 0, 20, 8, 21, 0))

        await expect(
            sut.execute({ checkInId:createdCheckIn2.id })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })    


})