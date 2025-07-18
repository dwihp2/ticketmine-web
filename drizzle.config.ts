import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DATABASE_NAME || "ticketmine_dev",
    user: process.env.DATABASE_USER || "ticketmine_user",
    password: process.env.DATABASE_PASSWORD || "ticketmine_pass",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
    ssl: false,
  }
});