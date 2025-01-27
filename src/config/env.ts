import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  ADMIN_PASSWORD: z.string({
    required_error: "ADMIN_PASSWORD is required"
  }),
  JWT_SECRET: z.string({
    required_error: "JWT_SECRET is required",
  }),
  JWT_EXPIRATION: z.number().default(60*60*24),
  DB_CLIENT: z.string().default('pg'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('pass'),
  DB_DATABASE: z.string().default('postgres'),
  DB_PORT: z.coerce.number().default(5432),

  SMS_KEY: z.string().optional()
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export default env.data;