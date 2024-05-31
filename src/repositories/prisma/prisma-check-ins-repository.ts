import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from "dayjs";
import CheckInsRepository from "../check-ins-repository";

export default class PrismaCheckInsRepositories implements CheckInsRepository {
    
    
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data,            
        })
        return checkIn
    }
    
    async findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null> {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where:{
                user_id,
                created_at:{
                    gte:startOfDay.toDate(),
                    lte:endOfDay.toDate(),
                }
            }
        })

        return checkIn
    }
    
    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where:{
                id:checkInId
            }
        })
        return checkIn
    }
    
    async findManyByUserId(user_id: string, page: number): Promise<CheckIn[]> {
        const pageNumber = page <= 1 ? 0 : (page - 1) * 20

        const checkIns = await prisma.checkIn.findMany({
            where:{
                user_id
            },
            take:20,
            skip:pageNumber
        })

        return checkIns
    }
    
    async countByUserId(userId: string): Promise<number> {
        const checkIn = await prisma.checkIn.count({
            where:{
                user_id:userId
            }
        })

        return checkIn
    }
    
    async save(data: CheckIn): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.update({ 
            where: {
                id:data.id
            },
            data,
         })

        return checkIn
    }


    

}