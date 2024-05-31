import PrismaCheckInsRepositories from "@/repositories/prisma/prisma-check-ins-repository"
import GetUserMetricsUseCase from "../get-user-metrics"

export default function makeGetUserMetricsUseCase() {

    const prismaCheckInsRepository = new PrismaCheckInsRepositories()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

    return getUserMetricsUseCase
}