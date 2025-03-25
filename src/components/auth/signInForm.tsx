import { SectionLayout } from "@components/layout/sectionLayout";
import { Logo } from "@components/logo/logo";
import { Typography } from "@ui/typography";
import { ProviderButtons } from "./providerButtons";
import { SignInInput } from "./signInInput";

export const SignInForm = () => {
  return (
    <SectionLayout className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center  max-md:px-5">
      <Logo />
      <Typography
        variant="h1"
        className="mt-4 text-center text-xl font-bold md:text-3xl"
      >
        Log in to your account
      </Typography>
      <Typography
        variant="h2"
        className="mb-4 text-center text-xl font-light text-muted-foreground md:text-2xl"
      >
        Please log in to your account to continue
      </Typography>

      <ProviderButtons />

      <div className="my-6 h-px w-full bg-neutral-100 dark:bg-neutral-800" />

      <SignInInput />
    </SectionLayout>
  );
};
