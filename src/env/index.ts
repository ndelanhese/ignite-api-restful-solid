import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['production', 'development', 'staging', 'test'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
