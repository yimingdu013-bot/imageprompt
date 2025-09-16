import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// 使用环境变量中的PostgreSQL连接字符串
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/saasfly";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
