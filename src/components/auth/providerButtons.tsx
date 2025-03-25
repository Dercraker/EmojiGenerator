import { SocialProviders } from "@auth/auth";
import { ProviderButton } from "./providerButton";

export const ProviderButtons = () => {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row">
      {SocialProviders.github ? <ProviderButton providerId="github" /> : null}
      {SocialProviders.google ? <ProviderButton providerId="google" /> : null}
    </div>
  );
};
