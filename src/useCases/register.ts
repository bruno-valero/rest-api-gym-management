import UsersRepository from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import UserAlreadyExistsError from "./errors/user-already-exists-error";

export interface RegisterUseCaseProps {
    password:string, 
    email:string, 
    name:string,
    role?: 'ADMIN' | 'MEMBER'
}

interface RegisterUseCaseResponse {
    user: User,
}

export default class RegisterUseCase {

    constructor(private usersRepository:UsersRepository) {}

    async execute({ password, email, name, role }:RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const sameEmail = await this.usersRepository.findByEmail(email)

        if (sameEmail) throw new UserAlreadyExistsError();
        
        
        const user = await this.usersRepository.create({        
            email,
            name, 
            password_hash,     
            role   
        })

        return { 
            user,
        }
    }
}