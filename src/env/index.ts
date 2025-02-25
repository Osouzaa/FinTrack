import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DB_HOST: z.string().min(4),
  DB_PORT: z.string(),
  PORT: z.coerce.number().default(3333),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_USERNAME: z.string(),
});

export function validateEnv(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);
  
  if (!parsed.success) {
    console.error('Invalid environment variables', parsed.error.format());
    throw new Error('Invalid environment variables.');
  }

  return parsed.data;
}

export const env = validateEnv(process.env);
