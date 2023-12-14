import 'dotenv/config'

import { env } from '@env'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$queryRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
