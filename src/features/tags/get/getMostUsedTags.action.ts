"use server";

import { action } from "@/lib/actions/safeActions";
import { GetMostUsedTagsQuery } from "./getMostUsedTags.query";

export const GetMostUsedTagsAction = action.action(async () => {
  const tags = await GetMostUsedTagsQuery();
  return tags;
});
