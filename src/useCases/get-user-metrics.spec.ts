import InMemoryCheckInsReposiory from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import GetUserMetricsUseCase from './get-user-metrics'

let checkInsRepository:InMemoryCheckInsReposiory
let sut:GetUserMetricsUseCase


describe('Get User Metrics Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsReposiory()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it("should be able to return the amount of a user's check-ins made", async () => {        

        const gym_id:Record<string, string> = {}
        const user_id = randomUUID()

        for (let i = 1; i <= 22; i++) {
            gym_id[`${i}`] = randomUUID()
            await checkInsRepository.create({
                gym_id:gym_id[`${i}`],
                user_id,
            })
        }

        const { checkInsCount } = await sut.execute({ userId:user_id })
        expect(checkInsCount).toEqual(22)        
    })         


})