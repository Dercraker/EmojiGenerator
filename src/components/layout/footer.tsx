import { Logo } from "@/components/logo/logo";
import { GLOBAL_CONFIG } from "@/globalConfig";
import { cn } from "@lib/utils";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="relative mt-16 w-full overflow-hidden border-t border-neutral-100 bg-white px-8 py-20 dark:border-white/[0.1] dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl items-start justify-between  text-sm text-neutral-500  md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mb-4 mr-0  md:mr-4 md:flex">
            <Logo />
          </div>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between sm:flex-row">
          <p className="mb-8 text-neutral-500 dark:text-neutral-400 sm:mb-0">
            &copy; {GLOBAL_CONFIG.company.name} {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
            <Link href={GLOBAL_CONFIG.company.linkedin}>
              <IconBrandLinkedin className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
            <Link href={GLOBAL_CONFIG.company.github}>
              <IconBrandGithub className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset ?? "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
