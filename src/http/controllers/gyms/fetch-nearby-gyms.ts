import makeFetchNearByGymsUseCase from "@/useCases/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function fetchNearbyGyms(req:FastifyRequest, res:FastifyReply) {
    const queryParamsSchema = z.object({
        userLatitude:z.coerce.number().refine(lat => Math.abs(lat) <= 90, 'latitude must be between -90 and 90'),
        userLongitude:z.coerce.number().refine(lat => Math.abs(lat) <= 180, 'longitude must be between -180 and 180'),
    })

    const { userLatitude, userLongitude } = queryParamsSchema.parse(req.query)
       
    const useCase = makeFetchNearByGymsUseCase()
    const { nearByGyms } = await useCase.execute({ userLatitude, userLongitude })

    return res.status(200).send({ nearByGyms });

}