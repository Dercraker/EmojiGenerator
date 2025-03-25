import { createMiddleware } from "next-safe-action";
import { ActionError } from "./safeActions";

const getAuthUser = async () => {
  const user = await auth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

export const AuthMiddleware = createMiddleware().define(async ({ next }) => {
  const user = await getAuthUser();

  return next({
    ctx: {
      user: user as User,
    },
  });
});
