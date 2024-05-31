import PrismaUsersRepositories from "@/repositories/prisma/prisma-users-repository"
import GetUserProfileUseCase from "../get-user-profile"

export default function makeGetUserProfileUseCase() {

    const prismaUserRepository = new PrismaUsersRepositories()
    const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)

    return getUserProfileUseCase
}