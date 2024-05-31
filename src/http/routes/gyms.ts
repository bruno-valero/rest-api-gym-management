import { FastifyInstance } from "fastify";
import createGym from "../controllers/gyms/create-gym";
import fetchNearbyGyms from "../controllers/gyms/fetch-nearby-gyms";
import searchGyms from "../controllers/gyms/search-gym";
import jsonResponse from "../middlewares/json-response";
import verifyJWT from "../middlewares/verify-jwt";
import verifyUserRole from "../middlewares/verify-user-role";

export default async function gymsRoutes(app: FastifyInstance) {

    // hooks
    app.addHook('onRequest', jsonResponse)
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/create', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
    app.get('/gyms/search', searchGyms)
    app.get('/gyms/nearby', fetchNearbyGyms)

}