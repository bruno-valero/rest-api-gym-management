import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import env from './env';
import checkInsRoutes from './http/routes/check-ins';
import gymsRoutes from './http/routes/gyms';
import usersRoutes from './http/routes/users';

const app = fastify();

app.register(fastifyJwt, { 
    secret:env.JWT_SECRET, 
    sign:{ expiresIn:'10m' },
    cookie:{
        cookieName:'refreshToken',
        signed: false,
    }
 })
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((err, _req, res) => {
    if (env.NODE_ENV !== 'production') {
        console.error(err)  
    }
    if (err instanceof ZodError) {
        return res.status(400).send({ message:'Validation error', issues:err.format() })
    }
    return res.status(500).send({message:'Internal server error.'})
})

export default app;
