import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  mobile: varchar("mobile", { length: 15 }).notNull().unique(),

  aadhaarHash: varchar("aadhaar_hash", { length: 64 }).unique(),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  role: varchar("role", { length: 30 }).notNull().default("CITIZEN"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
