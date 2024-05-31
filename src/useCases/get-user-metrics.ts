import CheckInsRepository from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
    userId: string, 
}

type GetUserMetricsUseCaseResponse = { checkInsCount: number }

export default class GetUserMetricsUseCase {

    constructor(private checkInRepository: CheckInsRepository) {}

    async execute({ userId }:GetUserMetricsUseCaseRequest):Promise<GetUserMetricsUseCaseResponse> {

        const checkInsCount = await this.checkInRepository.countByUserId(userId)      

        return { checkInsCount }

    }
}