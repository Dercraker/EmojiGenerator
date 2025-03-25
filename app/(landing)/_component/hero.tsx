"use client";

import { AddEmojiForm } from "@feat/emoji/create/AddEmojiForm";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center border-b border-neutral-100 dark:border-neutral-800">
      <Background />
      <Content />
    </div>
  );
};

const Content = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden px-8 pb-4  md:px-8 ">
      <div className="relative mt-20 flex flex-col items-center  justify-center ">
        <h1 className="mb-8relative mx-auto mt-4 max-w-6xl text-center text-3xl font-bold tracking-tight text-zinc-700 dark:text-white md:text-4xl lg:text-7xl ">
          Generate your custom emoji <br />
          <span className="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 bg-clip-text text-transparent">
            with AI
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block size-14 stroke-indigo-500 stroke-[1px]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <motion.path
                initial={{
                  pathLength: 0,
                  fill: "#a5b4fc",
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  fill: "#a5b4fc",
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                  repeatDelay: 0.5,
                }}
                d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
              />
            </svg>
          </span>
        </h1>
        <AddEmojiForm />
      </div>
    </div>
  );
};

const Background = () => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent,white)]",
      )}
    >
      <svg
        className="absolute size-[200%] -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="skewed-lines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-10,30 L30,-10 M-20,40 L40,-20 M-10,50 L50,-10"
              className="stroke-neutral-800/20 dark:stroke-neutral-200/20"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skewed-lines)" />
      </svg>
    </div>
  );
};
