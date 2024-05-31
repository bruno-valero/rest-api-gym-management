import UsersRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import InvalidCredentialsError from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email:string,
    password:string,
}

type AuthenticateUseCaseResponse = { user: User }

export default class AuthenticateUseCase {

    constructor(private userRepository: UsersRepository) {}

    async execute({ email, password }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new InvalidCredentialsError()
        
        const passwordDoesMath = await compare(password, user.password_hash)

        if (!passwordDoesMath) throw new InvalidCredentialsError()

        return { user }

    }
}