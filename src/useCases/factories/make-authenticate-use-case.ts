import PrismaUsersRepositories from "@/repositories/prisma/prisma-users-repository"
import AuthenticateUseCase from "../authenticate"

export default function makeAuthenticateUseCase() {

    const prismaUsersRepository = new PrismaUsersRepositories()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    return authenticateUseCase
}