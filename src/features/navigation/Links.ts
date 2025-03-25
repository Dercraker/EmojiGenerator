import { z } from "zod";
import type { GenericLinkSchema, NavigationLink } from "./navigation.type";

// Constantes pour les chemins
const PATHS = {
  EMOJI: `/emojis/:emojiSlug`,
};

export const EmptyLinkParamsSchema = z.object({}).strict();

export const EmojiLinkParamsSchema = EmptyLinkParamsSchema.extend({
  emojiSlug: z.string(),
}).strict();

const createLinkGenerator = (path: string, needsParams = false) => {
  if (!needsParams) {
    return () => path;
  }

  return (params: Record<string, string> = {}) => {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  };
};

const createLink = (
  href: string,
  label: string,
  options: Partial<
    Omit<NavigationLink, "href" | "label" | "generateLink">
  > = {},
  needsParams = false,
): NavigationLink => ({
  href: createLinkGenerator(href, needsParams),
  label,
  ...options,
});

// Définition des liens
export const LINKS = {
  Landing: {
    Landing: createLink("/", "Landing"),
  },

  Account: {
    Account: createLink("/account", "Account"),
  },

  Maintenance: createLink("/maintenance", "Maintenance", {
    hidden: true,
    disabled: true,
  }),

  Emoji: {
    Emoji: createLink("/emojis/:emojiSlug", "Emoji", {}, true),
  },

  Auth: {
    SignIn: createLink("/auth/signin", "SignIn", {
      hidden: true,
    }),
    VerifyEmail: createLink("/auth/verify-email", "VerifyEmail", {
      hidden: true,
    }),
  },
} satisfies GenericLinkSchema;
