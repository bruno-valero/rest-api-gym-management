import { CreateGymUseCaseProps } from "@/useCases/create-gym";
import { Coordinate } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";

export default interface GymsRepository {
    create:(data: Prisma.GymCreateInput & CreateGymUseCaseProps) => Promise<Gym>,
    findById:(gymId: string) => Promise<Gym | null>,
    findMany:(query: string, page: number) => Promise<Gym[]>,
    findManyNearBy:(coords: Coordinate) => Promise<Gym[]>,
}