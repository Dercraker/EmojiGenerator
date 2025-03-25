import { Logo } from "@components/logo/logo";
import { cn } from "@lib/utils";
import { GLOBAL_CONFIG } from "globalConfig";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  const pages = [
    {
      title: "Products",
      href: "#",
    },
    {
      title: "Studio",
      href: "#",
    },
    {
      title: "Clients",
      href: "#",
    },
    {
      title: "Pricing",
      href: "#",
    },
    {
      title: "Blog",
      href: "#",
    },
    {
      title: "Privacy",
      href: "#",
    },
    {
      title: "Terms",
      href: "#",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden border-t border-neutral-100 bg-white px-8 py-20 dark:border-white/[0.1] dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl items-start justify-between  text-sm text-neutral-500  md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mb-4 mr-0  md:mr-4 md:flex">
            <Logo />
          </div>

          <ul className="hover:text-text-neutral-800 flex list-none flex-col gap-4 text-neutral-600 transition-colors dark:text-neutral-300 sm:flex-row">
            {pages.map((page, idx) => (
              <li key={`pages${idx}`} className="list-none">
                <Link
                  className="hover:text-text-neutral-800 transition-colors "
                  href="/products"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between sm:flex-row">
          <p className="mb-8 text-neutral-500 dark:text-neutral-400 sm:mb-0">
            &copy; {new Date().getFullYear()} {GLOBAL_CONFIG.company.name}
          </p>
          <div className="flex gap-4">
            <Link href="#">
              <Twitter className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
            <Link href="#">
              <Linkedin className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
            <Link href="#">
              <Github className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
            <Link href="#">
              <Facebook className="size-6 text-neutral-500 dark:text-neutral-300" />
            </Link>
            <Link href="#">
              <Instagram className="size-6 text-neutral-500 dark:text-neutral-300" />
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
