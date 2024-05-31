import { CreateGymUseCaseProps } from "@/useCases/create-gym";
import getDistanceBetweenCoordinates, { Coordinate } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import GymsRepository from "../gyms-repository";


export default class InMemoryGymsReposiory implements GymsRepository {    

    public items:Gym[] = []

    async create (data: Prisma.GymCreateInput & CreateGymUseCaseProps): Promise<Gym> {
        const gym:Gym = {
            id:randomUUID(),
            description:data.description ?? null,
            latitude:new Decimal(String(data.latitude)),
            longitude:new Decimal(String(data.longitude)),
            phone:data.phone ?? null,
            title:data.title
        }

        this.items.push(gym)
        return gym
    }    

    async findById(gymId: string): Promise<Gym | null> {        
        return this.items.filter(item => {
            
            return item.id === gymId
        })?.[0] ?? null
        
    }

    async findMany(query: string, page: number): Promise<Gym[]> {
        const pageNumber = page <= 1 ? 0 : (page - 1) * 20
        return this.items.filter(item => item.title.includes(query)).slice(pageNumber, pageNumber + 20)
    }

    async findManyNearBy(coords: Coordinate): Promise<Gym[]> {
        return this.items.filter(item => {

            const gymCoords:Coordinate = {
                latitude:item.latitude.toNumber(),
                longitude:item.longitude.toNumber(),
            }
            const kmDistance = getDistanceBetweenCoordinates(coords, gymCoords)
            console.log(`kmDistance`, kmDistance)
            const MIN_DISTANCE_IN_KILOMETERS = 10

            const isNearby = kmDistance <= MIN_DISTANCE_IN_KILOMETERS

            return isNearby

        })
    }

}