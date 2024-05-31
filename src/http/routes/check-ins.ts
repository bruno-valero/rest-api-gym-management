import { FastifyInstance } from "fastify";
import createCheckIn from "../controllers/check-ins/create-check-in";
import fetchUserCheckInHistory from "../controllers/check-ins/fetch-user-check-in-history";
import fetchUserMetrics from "../controllers/check-ins/fetch-user-metricts";
import validateCheckIn from "../controllers/check-ins/validate-check-in";
import jsonResponse from "../middlewares/json-response";
import verifyJWT from "../middlewares/verify-jwt";
import verifyUserRole from "../middlewares/verify-user-role";

export default async function checkInsRoutes(app: FastifyInstance) {

    // hooks
    app.addHook('onRequest', jsonResponse)
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/:gymId/create-check-in', createCheckIn)
    app.get('/check-ins/history', fetchUserCheckInHistory)
    app.get('/users/metrics', fetchUserMetrics)
    app.patch('/check-ins/:checkInId/validate', { onRequest:[verifyUserRole('ADMIN')] }, validateCheckIn)

}