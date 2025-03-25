import { getServerUrl } from "@utils/server-url";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: getServerUrl(),
  plugins: [],
});

export const { signIn, signUp, signOut, useSession } = authClient;
