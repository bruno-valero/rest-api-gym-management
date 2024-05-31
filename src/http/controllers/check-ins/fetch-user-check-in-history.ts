import makeFetchUserCheckInHistoryUseCase from "@/useCases/factories/make-fetch-user-checkin-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function fetchUserCheckInHistory(req:FastifyRequest, res:FastifyReply) {
    const queryParamsSchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const userId = req.user.sub
    const { page } = queryParamsSchema.parse(req.query)
       
    const useCase = makeFetchUserCheckInHistoryUseCase()
    const { checkIns } = await useCase.execute({ userId, page })

    return res.status(200).send({ checkIns });

}