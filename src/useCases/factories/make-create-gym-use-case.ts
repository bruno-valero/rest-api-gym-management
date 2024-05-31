import PrismaGymsRepositories from "@/repositories/prisma/prisma-gyms-repository"
import CreateGymUseCase from "../create-gym"

export default function makeCreateGymUseCase() {

    const prismaGymsRepository = new PrismaGymsRepositories()
    const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)

    return createGymUseCase
}