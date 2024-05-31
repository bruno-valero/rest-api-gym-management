import makeGetUserMetricsUseCase from "@/useCases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function fetchUserMetrics(req:FastifyRequest, res:FastifyReply) {

    const userId = req.user.sub
       
    const useCase = makeGetUserMetricsUseCase()
    const { checkInsCount } = await useCase.execute({ userId })

    return res.status(200).send({ checkInsCount });

}