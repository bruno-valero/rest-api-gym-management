import { prisma } from "@/lib/prisma";
import { CreateGymUseCaseProps } from "@/useCases/create-gym";
import { Coordinate } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from '@prisma/client';
import GymsRepository from "../gyms-repository";

export default class PrismaGymsRepositories implements GymsRepository {
    
    
    async create(data: Prisma.GymCreateInput & CreateGymUseCaseProps): Promise<Gym> {
        const gym = prisma.gym.create({
            data,
        })

        return gym
    }
    
    async findById(gymId: string): Promise<Gym | null> {
        const gym = prisma.gym.findUnique({
            where:{
                id:gymId
            }
        })

        return gym
    }
    
    async findMany(query: string, page: number): Promise<Gym[]> {
        const pageNumber = page <= 1 ? 0 : (page - 1) * 20

        const gym = prisma.gym.findMany({
            where:{
                title: {
                    contains:query
                }
            },
            take:20,
            skip:pageNumber,
        })

        return gym
    }
    
    async findManyNearBy({ latitude, longitude }: Coordinate): Promise<Gym[]> {
        const gyms = prisma.$queryRaw<Gym[]>`
            select * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }


    

}