"use client";

import { authClient } from "@auth/authClient";
import { SubmitButton } from "@components/form/submitButton";
import { LINKS } from "@feat/navigation/Links";
import { cn } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@ui/form";
import { Typography } from "@ui/typography";
import { unwrapSafePromise } from "@utils/promise";
import { motion } from "framer-motion";
import { GLOBAL_CONFIG } from "globalConfig";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";
import { z } from "zod";
export type SignInInputProps = {};

export const SignInInput = () => {
  const [isClicked, setIsClicked] = useState(false);

  const SignInCredentialsFormaSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).optional(),
  });

  const [callbackURL] = useQueryState(
    "callbackUrl",
    parseAsString.withDefault(LINKS.Account.Account.href({})),
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof SignInCredentialsFormaSchema>) => {
      if (isUsingCredentials)
        return unwrapSafePromise(
          authClient.signIn.email({
            ...data,
            password: data.password ?? "",
            rememberMe: true,
          }),
        );
      else
        return unwrapSafePromise(
          authClient.signIn.magicLink({
            ...data,
          }),
        );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      const newUrl = new URL(window.location.href);
      newUrl.pathname = isUsingCredentials
        ? LINKS.Auth.VerifyEmail.href({})
        : callbackURL;

      //TODO TEST ME
      // window.location.href = newUrl.toString();
      window.history.pushState({}, "", newUrl);
    },
  });

  const form = useZodForm({
    schema: SignInCredentialsFormaSchema,
    mode: "onBlur",
  });

  const [isUsingCredentials, setIsUsingCredentials] = useLocalStorage(
    "SignInFormWithCredentials",
    true,
  );

  return (
    <>
      <Form
        form={form}
        onSubmit={() => mutate(form.getValues())}
        className="w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <motion.input
                  initial={{
                    height: "0px",
                    opacity: 0,
                    marginBottom: "0px",
                  }}
                  animate={{
                    height: isClicked ? "40px" : "0px",
                    opacity: isClicked ? 1 : 0,
                    marginBottom: isClicked ? "10px" : "0px",
                  }}
                  {...field}
                  type="email"
                  placeholder={`john.doe@${GLOBAL_CONFIG.company.name}.com`}
                  className="block h-10 w-full rounded-md border-0 bg-neutral-900 px-4 text-white shadow-input placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6"
                />
              </FormControl>
              <FormMessage className="-mt-3 mb-2" />
            </FormItem>
          )}
        />
        {isUsingCredentials && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.input
                    initial={{
                      height: "0px",
                      opacity: 0,
                      marginBottom: "0px",
                    }}
                    animate={{
                      height: isClicked ? "40px" : "0px",
                      opacity: isClicked ? 1 : 0,
                      marginBottom: isClicked ? "10px" : "0px",
                    }}
                    {...field}
                    type="password"
                    placeholder="password"
                    className="block h-10 w-full rounded-md border-0 bg-neutral-900 px-4 text-white shadow-input placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6"
                  />
                </FormControl>
                <FormMessage className="-mt-3 mb-2" />
              </FormItem>
            )}
          />
        )}
        <SubmitButton
          isLoading={isPending}
          disabled={isClicked && !form.formState.isValid}
          onClick={(e) => {
            if (!isClicked) {
              setIsClicked(true);
              return;
            }
          }}
          className={cn(
            "group/btn relative w-full rounded-lg bg-white px-4 py-3 text-black",
            !isClicked && "-mt-3",
          )}
        >
          {!isClicked && (
            <div className="absolute inset-0 size-full opacity-0 transition duration-200 group-hover/btn:opacity-100">
              <div className="absolute -left-px -top-px size-4 rounded-tl-lg border-l-2 border-t-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-left-4 group-hover/btn:-top-4 dark:border-white"></div>
              <div className="absolute -right-px -top-px size-4 rounded-tr-lg border-r-2 border-t-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-right-4 group-hover/btn:-top-4 dark:border-white"></div>
              <div className="absolute -bottom-px -left-px size-4 rounded-bl-lg border-b-2 border-l-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-bottom-4 group-hover/btn:-left-4 dark:border-white"></div>
              <div className="absolute -bottom-px -right-px size-4 rounded-br-lg border-b-2 border-r-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-bottom-4 group-hover/btn:-right-4 dark:border-white"></div>
            </div>
          )}
          <span className="text-sm">
            {!isClicked
              ? "Continue with Email"
              : isUsingCredentials
                ? "Sign In"
                : "Sign In with Magic Link"}
          </span>
        </SubmitButton>
      </Form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
        className="mr-auto cursor-pointer select-none hover:underline"
        onClick={() => {
          setIsUsingCredentials(!isUsingCredentials);
        }}
      >
        <Typography variant="muted">
          {isUsingCredentials
            ? "Continue with Magic Link"
            : "Continue with Credentials"}
        </Typography>
      </motion.div>
    </>
  );
};
