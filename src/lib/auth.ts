import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../../db/connection";
import { users, sessions, accounts, verifications } from "../../auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // PostgreSQL
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    }
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true // Automatically sign in users after successful registration
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache for 5 minutes
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false, // Don't allow setting role during registration
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      }
    }
  },
  plugins: [
    nextCookies() // Automatically handle cookies in Next.js server actions
  ],
  advanced: {
    generateId: () => crypto.randomUUID(),
  }
});

export type Session = typeof auth.$Infer.Session;

// Extended user type that includes our additional fields
export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  phone?: string;
  bio?: string;
  location?: string;
}
