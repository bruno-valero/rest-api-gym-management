import GymsRepository from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

export interface CreateGymUseCaseProps {
    latitude:number,
    longitude:number, 
    title:string,   
    phone:string | null,
    description:string | null
}

interface CreateGymUseCaseResponse {
    gym: Gym,
}

export default class CreateGymUseCase {

    constructor(private gymRepository:GymsRepository) {}

    async execute({ latitude, longitude, title, phone, description }:CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
        
        
        
        const gym = await this.gymRepository.create({        
            latitude,
            longitude, 
            title,   
            phone,
            description                
        })

        return { 
            gym,
        }
    }
}