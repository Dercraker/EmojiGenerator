"use client";

import { authClient } from "@auth/authClient";
import { LoadingButton } from "@components/form/loadingButton";
import { LINKS } from "@feat/navigation/Links";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import type { ReactNode } from "react";

const ProviderData: Record<string, { icon: ReactNode; name: string }> = {
  github: {
    icon: <IconBrandGithub size={16} />,
    name: "Github",
  },
  google: {
    icon: <IconBrandGoogle size={16} />,
    name: "Google",
  },
};

type ProviderButtonProps = {
  providerId: "github" | "google";
};

export const ProviderButton = ({ providerId }: ProviderButtonProps) => {
  const { icon, name } = ProviderData[providerId];

  const [callbackURL] = useQueryState(
    "callbackUrl",
    parseAsString.withDefault(LINKS.Account.Account.href({})),
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      authClient.signIn.social({
        provider: providerId,
        callbackURL,
      }),
  });

  return (
    <LoadingButton
      loading={isPending}
      className="flex flex-1 items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-gray-100 px-4 py-3 text-neutral-700 shadow-[0px_1.5px_0px_0px_rgba(0,0,0,0.05)_inset] transition duration-200 hover:bg-gray-100/80 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:shadow-[0px_1.5px_0px_0px_rgba(255,255,255,0.05)_inset]"
      size="lg"
      onClick={() => {
        mutate();
      }}
    >
      {icon}
      <span className="ml-2 text-base">Login with {name}</span>
    </LoadingButton>
  );
};
