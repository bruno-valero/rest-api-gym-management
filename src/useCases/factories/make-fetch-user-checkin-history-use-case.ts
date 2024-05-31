import PrismaCheckInsRepositories from "@/repositories/prisma/prisma-check-ins-repository"
import FetchUserCheckInHistoryUseCase from "../fetch-user-checkin-history"

export default function makeFetchUserCheckInHistoryUseCase() {

    const prismaCheckInsRepository = new PrismaCheckInsRepositories()
    const fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(prismaCheckInsRepository)

    return fetchUserCheckInHistoryUseCase
}