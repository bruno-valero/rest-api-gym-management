import InvalidCredentialsError from "@/useCases/errors/invalid-credentials-error";
import makeAuthenticateUseCase from "@/useCases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export default async function authenticate(req:FastifyRequest, res:FastifyReply) {
    const bodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })

    const { email, password } = bodySchema.parse(req.body)

    try {        
        const authenticateUseCase = makeAuthenticateUseCase()
        const { user } = await authenticateUseCase.execute({ password, email })

        const token = await res.jwtSign({
            role: user.role
        }, {
            sign:{
                sub:user.id
            }
        })

        const refreshToken = await res.jwtSign({
            role: user.role
        }, {
            sign:{
                sub:user.id,
                expiresIn:'7d'
            },
        })

        return res
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({ token });

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return res.status(400).send({message: err.message})
        }
        throw err
    }    

}