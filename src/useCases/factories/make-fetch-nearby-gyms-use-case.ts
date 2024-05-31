import PrismaGymsRepositories from "@/repositories/prisma/prisma-gyms-repository"
import FetchNearByGymsUseCase from "../fetch-nearby-gyms"

export default function makeFetchNearByGymsUseCase() {

    const prismaGymsRepository = new PrismaGymsRepositories()
    const fetchNearByGymsUseCase = new FetchNearByGymsUseCase(prismaGymsRepository)

    return fetchNearByGymsUseCase
}