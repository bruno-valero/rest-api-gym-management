import PrismaGymsRepositories from "@/repositories/prisma/prisma-gyms-repository"
import SearchGymsUseCase from "../search-gyms"

export default function makeSearchGymsUseCase() {

    const prismaGymsRepository = new PrismaGymsRepositories()
    const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository)

    return searchGymsUseCase
}