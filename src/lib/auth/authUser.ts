import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { auth } from "./auth";

export class AuthError extends Error {}

export const GetCurrentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const GetCurrentUser = async () => {
  const session = await GetCurrentSession();

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  return user;
};

export const GetRequiredUser = async () => {
  const user = await GetCurrentUser();

  if (!user) {
    unauthorized();
  }

  return user;
};
