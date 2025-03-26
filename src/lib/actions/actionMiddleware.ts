import { GetCurrentUser } from "@/lib/auth/authUser";
import type { User } from "@prisma/client";
import { createMiddleware } from "next-safe-action";
import { ActionError } from "./safeActions";

export const AuthMiddleware = createMiddleware().define(async ({ next }) => {
  const user = await GetCurrentUser();

  if (!user) {
    throw new ActionError("Please log in to continue !");
  }

  if (!user.id || !user.email) {
    throw new ActionError("Please log in to continue !");
  }

  return next({
    ctx: {
      user: user as User,
    },
  });
});
