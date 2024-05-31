

import env from "@/env";
import app from "./app";



app.listen({ port:env.PORT, host:'0.0.0.0' }).then(() => {
    console.log(`🚀🚀 fastify listenning na porta ${env.PORT}!`)
}).catch((error) => {
    console.log(`An Error Ocurred: ${error.message}`)
})