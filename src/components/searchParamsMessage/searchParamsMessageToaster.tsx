"use client";

import {
  deleteSearchParamsMessageUrl,
  SearchParamsMessageKeys,
} from "@feat/searchParamsMessage/createSearchParamsMessages";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const SearchParamsMessageToaster = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastId: string | number | null = null;

    if (searchParams.get(SearchParamsMessageKeys.message)) {
      toastId = toast(
        searchParams.get(SearchParamsMessageKeys.message) as string,
      );
    }
    if (searchParams.get(SearchParamsMessageKeys.success)) {
      toastId = toast.success(
        searchParams.get(SearchParamsMessageKeys.success) as string,
      );
    }
    if (searchParams.get(SearchParamsMessageKeys.error)) {
      toastId = toast.error(
        searchParams.get(SearchParamsMessageKeys.error) as string,
      );
    }

    deleteSearchParamsMessageUrl();
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [searchParams]);
};
