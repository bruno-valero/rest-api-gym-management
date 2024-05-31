import PrismaCheckInsRepositories from "@/repositories/prisma/prisma-check-ins-repository"
import ValidateCheckInUseCase from "../validate-check-in"

export default function makeValidateCheckInUseCase() {

    const prismaCheckInsRepository = new PrismaCheckInsRepositories()
    const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

    return validateCheckInUseCase
}