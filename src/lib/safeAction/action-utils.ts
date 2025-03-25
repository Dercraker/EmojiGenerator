/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeActionResult } from 'next-safe-action';
import type { z } from 'zod';

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
  if (action && !action.serverError && !action.validationErrors) {
    return true;
  }

  return false;
};
