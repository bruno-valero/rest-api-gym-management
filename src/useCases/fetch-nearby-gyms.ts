import GymsRepository from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearByGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number,
}

type FetchNearByGymsUseCaseResponse = { nearByGyms: Gym[] }

export default class FetchNearByGymsUseCase {

    constructor(private gymsRepository: GymsRepository) {}

    async execute({ userLatitude, userLongitude }:FetchNearByGymsUseCaseRequest):Promise<FetchNearByGymsUseCaseResponse> {

        const nearByGyms = await this.gymsRepository.findManyNearBy({
            latitude:userLatitude,
            longitude:userLongitude,
        })      

        return { nearByGyms }

    }
}