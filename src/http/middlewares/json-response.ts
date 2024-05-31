import { FastifyReply, FastifyRequest } from "fastify";

export default async function jsonResponse(req:FastifyRequest, res:FastifyReply) {

    res.header('content-type', 'application/json')

}