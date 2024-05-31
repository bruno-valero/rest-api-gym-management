import makeGetUserProfileUseCase from "@/useCases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function profile(req:FastifyRequest, res:FastifyReply) {     

    const tokenData = req.user
    const userId = tokenData.sub
    
    const getUserProfile = makeGetUserProfileUseCase()
    const { user:{password_hash, ...user} } = await getUserProfile.execute({ userId })    
    
    
    return res.status(200).send({ user });
}