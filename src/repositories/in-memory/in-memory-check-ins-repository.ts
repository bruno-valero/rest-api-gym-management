import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import CheckInsRepository from "../check-ins-repository";


export default class InMemoryCheckInsReposiory implements CheckInsRepository {    

    public items:CheckIn[] = []

    async create ({ gym_id, user_id, validated_at }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn:CheckIn = {
            id:randomUUID(),
            created_at: new Date(),
            gym_id,
            user_id,
            validated_at:validated_at ? new Date(validated_at) : null,
        }

        this.items.push(checkIn)
        return checkIn
    }    

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')
        return this.items.filter(item => {
            const checkInDate = dayjs(item.created_at)
            const isOnSameDay = checkInDate.isAfter(startOfDay) && startOfDay.isBefore(endOfDay)
            return item.user_id === userId && isOnSameDay
        })?.[0] ?? null
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkins = this.items.filter(item => item.user_id === userId)   
        const pageNumber = page <= 1 ? 0 : (page - 1) * 20
        return checkins.slice(pageNumber, pageNumber + 20)
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items.filter(item => item.user_id === userId).length
    }   

    async findById(checkInId: string): Promise<CheckIn | null> {
        return this.items.filter(item => item.id === checkInId)?.[0] ?? null;
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const index = this.items.findIndex(item => item.id === checkIn.id)
        if (index >= 0) {
            this.items[index] = checkIn;
        }
        return this.items[index];
    }

}