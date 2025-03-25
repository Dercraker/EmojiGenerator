"use client";

import { LINKS } from "@feat/navigation/Links";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LoginButtonProps = {
  buttonProps: VariantProps<typeof buttonVariants>;
  className?: string;
};

export const LoginButton = ({ buttonProps, className }: LoginButtonProps) => {
  const href = usePathname();

  return (
    <Link
      href={`${LINKS.Auth.SignIn.href({})}?callbackUrl=${href}`}
      className={cn(
        buttonVariants({ variant: "outline", ...buttonProps }),
        className,
      )}
    >
      Login
    </Link>
  );
};
