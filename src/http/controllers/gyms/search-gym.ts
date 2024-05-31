import makeSearchGymsUseCase from "@/useCases/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function searchGyms(req:FastifyRequest, res:FastifyReply) {
    const queryParamsSchema = z.object({
        query:z.coerce.string(),
        page:z.coerce.number().min(1).default(1),
    })

    const { query, page } = queryParamsSchema.parse(req.query)
       
    const useCase = makeSearchGymsUseCase()
    const { gyms } = await useCase.execute({ query, page })

    return res.status(200).send({ gyms });

}