import { z } from "zod";
import type { GenericLinkSchema, NavigationLink } from "./navigation.type";

// Constantes pour les chemins
const PATHS = {
  ORG: `/orgs/:orgSlug`,
  TRIP: `/trips/:tripSlug`,
  STEP: `/steps/:stepSlug`,
};

export const EmptyLinkParamsSchema = z.object({}).strict();

export const OrgLinkParamsSchema = EmptyLinkParamsSchema.extend({
  orgSlug: z.string(),
}).strict();

export const TripLinkParamsSchema = OrgLinkParamsSchema.extend({
  tripSlug: z.string(),
}).strict();

export const StepLinkParamsSchema = TripLinkParamsSchema.extend({
  stepSlug: z.string(),
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
    Home: createLink("/home", "Landing"),
    Features: createLink("/#features", "Features"),
    Pricing: createLink("/#pricing", "Pricing"),
    Contact: createLink("/#contact", "Contact"),
  },

  Account: {
    Account: createLink("/account", "Account"),
  },

  Maintenance: createLink("/maintenance", "Maintenance", {
    hidden: true,
    disabled: true,
  }),

  Auth: {
    SignIn: createLink("/auth/signin", "SignIn", {
      hidden: true,
    }),
    VerifyEmail: createLink("/auth/verify-email", "VerifyEmail", {
      hidden: true,
    }),
  },
} satisfies GenericLinkSchema;
