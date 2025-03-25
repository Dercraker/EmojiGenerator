import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_URL_UNPOOLED: z.string().min(1),

    DOMAIN: z.string(),
    PROD_URL: z.string().url(),
    VERCEL_ENV: z.enum(["production", "preview"]).optional(),
    VERCEL_URL: z.string().optional(),

    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1).url(), // http://localhost:3000 #Base URL of your app

    GITHUB_CLIENT_ID: z.string().min(1).optional(),
    GITHUB_CLIENT_SECRET: z.string().min(1).optional(),

    NODE_ENV: z.enum(["development", "production"]),

    UPLOADTHING_TOKEN: z.string(),
    REPLICATE_API_TOKEN: z.string(),
    REPLICATE_MODEL_VERSION: z.string().regex(/^[^/]+\/[^/:]+(?::[^:]+)?$/),
  },
  experimental__runtimeEnv: {
    ...process.env,
  },
});
