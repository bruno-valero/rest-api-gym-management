import CheckInsRepository from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInHistoryUseCaseRequest {
    userId: string,   
    page: number 
}

type FetchUserCheckInHistoryUseCaseResponse = { checkIns: CheckIn[] }

export default class FetchUserCheckInHistoryUseCase {

    constructor(private checkInRepository: CheckInsRepository) {}

    async execute({ userId, page }:FetchUserCheckInHistoryUseCaseRequest):Promise<FetchUserCheckInHistoryUseCaseResponse> {

        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)      

        return { checkIns }

    }
}