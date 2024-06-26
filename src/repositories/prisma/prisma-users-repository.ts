import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import UsersRepository from "../users-repository";

export default class PrismaUsersRepositories implements UsersRepository {    


    async create(data:Prisma.UserCreateInput) {        
        const user = await prisma.user.create({ data, })
        return user
    }

    async findByEmail(email:string ) {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user
    }

    async findById (id: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
        const user = await prisma.user.findUnique({
            where:{
                id,
            }
        })
        return user
    }

}