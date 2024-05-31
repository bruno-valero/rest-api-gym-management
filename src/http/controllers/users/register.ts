import UserAlreadyExistsError from "@/useCases/errors/user-already-exists-error";
import makeRegisterUseCase from "@/useCases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function register(req:FastifyRequest, res:FastifyReply) {
    const bodySchema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(6),
        role:z.enum(['ADMIN', 'MEMBER']).optional()
    })

    const { name, email, password, role } = bodySchema.parse(req.body)

    try {        
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({ password, email, name, role })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return res.status(409).send({message: err.message})
        }
        throw err
    }

    return res.status(201).send();

}