import posthog from "posthog-js";
import { z } from "zod";

export const signInEvent = z.enum([
  "SigninWithMagicLink",
  "SigninWithGithub",
  "SigninWithGoogle",
]);

export const contactEvents = z.enum(["SendFeedBack", "SendContactSupport"]);

export const errorEvents = z.enum([
  "ServerActionFailed",
  "ServerActionError",
  "ServerActionSchemaValidationFailed",
  "toto",
]);

export const combinedPhEvents = z.union([
  signInEvent,
  contactEvents,
  errorEvents,
]);

export type phEvents = z.infer<typeof combinedPhEvents>;

export const phCapture = (eventName: phEvents, data?: object) =>
  posthog.capture(eventName, { ...data });

export const phErrorCapture = (eventName: phEvents, data?: object) =>
  posthog.captureException(eventName, { ...data });
