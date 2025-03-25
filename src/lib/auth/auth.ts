import { env } from "@lib/env/server";
import { prisma } from "@lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github:
      env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
        ? {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }
        : undefined,
  },
  plugins: [
    //! Always last plugin
    nextCookies(),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {}),
  },
  user: {
    changeEmail: {
      enabled: false,
    },
    deleteUser: {
      enabled: true,
    },
  },
});

type SocialProvidersType = Parameters<typeof betterAuth>[0]["socialProviders"];
export const SocialProviders = {
  ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: env.GITHUB_CLIENT_ID,
          clientSecret: env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
  //TODO add google and discord
  // ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
  //   ? {
  //       google: {
  //         clientId: env.GOOGLE_CLIENT_ID,
  //         clientSecret: env.GOOGLE_CLIENT_SECRET,
  //       },
  //     }
  //   : {}),
} satisfies SocialProvidersType;
