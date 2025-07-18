import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
});
