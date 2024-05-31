import { config } from 'dotenv';
import z from "zod";


if (process.env.NODE_ENV === 'test') {
    config({ path:'.env.test' })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV:z.enum(['dev', 'test', 'production']).default('production'),
    PORT:z.coerce.number().default(3000),
    JWT_SECRET:z.string(),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(`❌ Invalid Enviroment Variables:`, _env.error.format());

    throw new Error(`Invalid Enviroment Variables: ${JSON.stringify(_env.error.format())}`);
}

const env = _env.data;

export default env;
