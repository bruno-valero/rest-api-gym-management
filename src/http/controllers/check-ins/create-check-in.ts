import makeCheckInUseCase from "@/useCases/factories/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function createCheckIn(req:FastifyRequest, res:FastifyReply) {
    const paramsSchema = z.object({
        gymId: z.coerce.string().uuid(),
    })

    const queryParamsSchema = z.object({
        userLatitude:z.coerce.number().refine(lat => Math.abs(lat) <= 90, 'latitude must be between -90 and 90'),
        userLongitude:z.coerce.number().refine(lat => Math.abs(lat) <= 180, 'longitude must be between -180 and 180'),
    })    

    const userId = req.user.sub
    const { gymId } = paramsSchema.parse(req.params)
    const { userLatitude, userLongitude } = queryParamsSchema.parse(req.query)
       
    const useCase = makeCheckInUseCase()
    const { checkIn } = await useCase.execute({ userId, gymId, userLatitude, userLongitude })

    return res.status(200).send({ checkIn });

}