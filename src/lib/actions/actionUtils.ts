/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "@lib/logger";
import { phErrorCapture } from "@lib/postHog/phEvents";
import type { SafeActionResult } from "next-safe-action";
import type { z } from "zod";

/**
 * Determines if a server action is successful or not
 * A server action is successful if it has a data property and no serverError property
 *
 * @param action Return value of a server action
 * @returns A boolean indicating if the action is successful
 */
export const isActionSuccessful = <T extends z.ZodType, Data>(
  action?: SafeActionResult<string, T, readonly [], any, any, Data>,
): action is {
  data: Data;
  serverError: undefined;
  validationError: undefined;
} => {
  if (!action) {
    logger.error({ message: "🐞~ IsActionSuccessful ~ No action returned" });
    phErrorCapture("ServerActionFailed", {
      message: "🐞~ IsActionSuccessful ~ No action returned",
    });
    return false;
  }

  if (action.serverError) {
    logger.error({
      message: "🐞~ IsActionSuccessful ~ Server error throw",
      serverError: action.serverError,
    });
    phErrorCapture("ServerActionError", {
      message: "🐞~ IsActionSuccessful ~ Server error throw",
      serverError: action.serverError,
    });
    return false;
  }

  if (action.validationErrors) {
    logger.error({
      message: "🐞~ IsActionSuccessful ~ Action schema validation failed",
      validationErrors: action.validationErrors,
    });
    phErrorCapture("ServerActionSchemaValidationFailed", {
      message: "🐞~ IsActionSuccessful ~ Action schema validation failed",
      validationErrors: action.validationErrors,
    });
    return false;
  }

  return true;
};
