import makeValidateCheckInUseCase from "@/useCases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export default async function validateCheckIn(req:FastifyRequest, res:FastifyReply) {
    const paramsSchema = z.object({
        checkInId :z.coerce.string(),
    })

    const { checkInId } = paramsSchema.parse(req.params)
       
    const useCase = makeValidateCheckInUseCase()
    const { checkIn } = await useCase.execute({ checkInId })

    return res.status(204).send();

}