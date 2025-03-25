"use server";

import { action } from "@/lib/actions/safeActions";
import { GetEmojisQuery } from "@feat/emoji/get/getEmojis.query";
import type { Emoji } from "@prisma/client";
import { z } from "zod";

export type GetEmojisResponse = {
  items: Pick<Emoji, "id" | "prompt" | "originalUrl" | "slug" | "createdAt">[];
  nextCursor: string | undefined;
};

const GetEmojisActionSchema = z.object({
  cursor: z.string().optional(),
  take: z.number().optional(),
});

export const GetEmojisAction = action
  .schema(GetEmojisActionSchema)
  .action(async ({ parsedInput }) => {
    const response = await GetEmojisQuery(parsedInput);

    return {
      items: response.items
        .filter(
          (item): item is typeof item & { originalUrl: string } =>
            item.originalUrl !== null,
        )
        .map((item) => ({
          id: item.id,
          prompt: item.prompt,
          originalUrl: item.originalUrl,
          slug: item.slug,
          createdAt: item.createdAt,
        })),
      nextCursor: response.nextCursor,
    };
  });
