import { eq, or } from "drizzle-orm";
import { db } from "../config/database.js";
import { users } from "../db/schema.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { hashAadhaar } from "../utils/identity.js";

export const registerUser = async ({ name, email, mobile, aadhaar, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedMobile = mobile.trim();
  const normalizedAadhaar = aadhaar.replace(/\s/g, "");

  // Check existing email or mobile
  const existingUser = await db
    .select()
    .from(users)
    .where(or(eq(users.email, normalizedEmail), eq(users.mobile, normalizedMobile)));

  if (existingUser.length > 0) {
    throw new Error("Email or mobile already registered");
  }

  // Hash Aadhaar
  const aadhaarHash = hashAadhaar(normalizedAadhaar);

  // Check existing Aadhaar
  const existingAadhaar = await db
    .select()
    .from(users)
    .where(eq(users.aadhaarHash, aadhaarHash));

  if (existingAadhaar.length > 0) {
    throw new Error("Aadhaar is already registered");
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Insert user
  const [user] = await db
    .insert(users)
    .values({
      name,
      email: normalizedEmail,
      mobile: normalizedMobile,
      aadhaarHash,
      passwordHash,
      role: "CITIZEN",
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      mobile: users.mobile,
      role: users.role,
    });

  return user;
};

export const loginUser = async ({ identifier, password }) => {
  const value = identifier.trim();
  let user;

  // Login using email
  if (value.includes("@")) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, value.toLowerCase()));

    user = result[0];
  } else {
    // Login using Aadhaar
    const aadhaar = value.replace(/\s/g, "");
    const aadhaarHash = hashAadhaar(aadhaar);

    const result = await db
      .select()
      .from(users)
      .where(eq(users.aadhaarHash, aadhaarHash));

    user = result[0];
  }

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordValid = await comparePassword(password, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};
