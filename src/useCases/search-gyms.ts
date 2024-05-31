import GymsRepository from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

export interface SearchGymsUseCaseProps {
    query: string,
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[],
}

export default class SearchGymsUseCase {

    constructor(private gymRepository:GymsRepository) {}

    async execute({ query, page }:SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
        
        
        
        const gyms = await this.gymRepository.findMany(query, page)

        return { 
            gyms,
        }
    }
}