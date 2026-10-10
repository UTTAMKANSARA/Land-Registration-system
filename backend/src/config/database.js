import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL || "postgresql://elandregistry:development_password@localhost:5432/elandregistry");

export const db = drizzle(client);
