import { env } from "@lib/env/server";

/**
 * This method return the server URL based on the environment.
 */
export const getServerUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // If we are in production, we return the production URL.
  if (env.VERCEL_ENV === "production") {
    return env.PROD_URL;
  }

  // If we are in "stage" environment, we return the staging URL.
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  // If we are in development, we return the localhost URL.
  return "http://localhost:3000";
};
