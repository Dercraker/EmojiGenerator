"use client";

import type { buttonVariants } from "@ui/button";

import { useSession } from "@auth/authClient";
import { Button } from "@ui/button";
import type { VariantProps } from "class-variance-authority";
import { LoginButton } from "./loginButton";

export type AuthButtonProps = {
  loginProps: VariantProps<typeof buttonVariants>;
  loginClassName?: string;
};

export const AuthButton = ({
  loginProps,
  loginClassName: className,
}: AuthButtonProps) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <LoginButton buttonProps={loginProps} className={className} />;
  }

  return <Button>Todo User dropdown</Button>;
};
