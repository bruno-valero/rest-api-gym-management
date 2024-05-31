import PrismaCheckInsRepositories from "@/repositories/prisma/prisma-check-ins-repository"
import PrismaGymsRepositories from "@/repositories/prisma/prisma-gyms-repository"
import CheckInUseCase from "../check-in"

export default function makeCheckInUseCase() {

    const prismaCheckInsRepository = new PrismaCheckInsRepositories()
    const prismaGymsRepository = new PrismaGymsRepositories()
    const checkInUseCase = new CheckInUseCase(prismaCheckInsRepository, prismaGymsRepository)

    return checkInUseCase
}