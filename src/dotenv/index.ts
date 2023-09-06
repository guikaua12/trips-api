import { z } from 'zod';

require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

const envSchema = z.object({
    PORT: z.preprocess((v) => parseInt(v as string), z.number().default(2000)),
    CONNECTION_URL: z.string().default('postgresql://postgres:root@localhost:5432/trips'),
    JWT_SECRET: z.string().default('some_secret'),
    JWT_EXPIRY: z.string().default('30m'),
});

export const env = envSchema.parse(process.env);
