import { AuthError } from "@lib/auth/authUser";
import { logger } from "@lib/logger";
import { createSafeActionClient } from "next-safe-action";
import { AuthMiddleware } from "./actionMiddleware";

export class ActionError extends Error {}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    logger.info("[DEV] - Action Error", e.message);
    return e.message;
  }

  if (e instanceof AuthError) {
    logger.info("[DEV] - Auth Error", e.message);
    return e.message;
  }

  logger.info("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleServerError,
});

export const authAction = createSafeActionClient({ handleServerError }).use(
  AuthMiddleware,
);
