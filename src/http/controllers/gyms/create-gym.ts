import makeCreateGymUseCase from "@/useCases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function createGym(req:FastifyRequest, res:FastifyReply) {
    const bodySchema = z.object({
        latitude:z.coerce.number().refine(lat => Math.abs(lat) <= 90, 'latitude must be between -90 and 90'),
        longitude:z.coerce.number().refine(lat => Math.abs(lat) <= 180, 'longitude must be between -180 and 180'),
        title:z.string(),
        phone:z.string().nullable(),
        description:z.string().nullable(),
    })

    const { latitude, longitude, title, phone, description } = bodySchema.parse(req.body)
       
    const useCase = makeCreateGymUseCase()
    await useCase.execute({ latitude, longitude, title, phone, description })    

    return res.status(201).send();

}