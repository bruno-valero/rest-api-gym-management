import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import UsersRepository from "../users-repository";


export default class InMemoryUsersReposiory implements UsersRepository {    

    public items:User[] = []

    async create (data: Prisma.UserCreateInput): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; }> {
        const user = {
            id:randomUUID(),
            name:data.name,
            email:data.email,
            created_at:new Date(),
            password_hash:data.password_hash,
        }

        this.items.push(user)
        return user
    }
    
    async findByEmail (email: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
        return this.items.filter(item => item.email === email)?.[0] ?? null
    }

    async findById(userId: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
        return this.items.filter(item => item.id === userId)?.[0] ?? null
    }

}