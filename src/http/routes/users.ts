import { FastifyInstance } from "fastify";
import authenticate from "../controllers/users/authenticate";
import profile from "../controllers/users/profile";
import refresh from "../controllers/users/refresh";
import register from "../controllers/users/register";
import jsonResponse from "../middlewares/json-response";
import verifyJWT from "../middlewares/verify-jwt";

export default async function usersRoutes(app: FastifyInstance) {

    // hooks
    app.addHook('onRequest', jsonResponse)


    // public routes
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.patch('/token/refresh', refresh)
    
    // require authentication routes
    app.get('/me', { onRequest:[verifyJWT] }, profile)
}