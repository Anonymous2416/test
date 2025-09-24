import { serverOnly } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";

import { env } from "@/env/server";
import { db } from "@/lib/db";

const getAuthConfig = serverOnly(() =>
  betterAuth({
    baseURL: env.VITE_BASE_URL,
    secret: env.BETTER_AUTH_SECRET,
    telemetry: {
      enabled: false,
    },
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      },
    },
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      reactStartCookies(),
      organization({
        allowUserToCreateOrganization: true,
        organizationLimit: 5,
        creatorRole: "admin",
      }),
    ],
  }),
);

export const auth = getAuthConfig();
