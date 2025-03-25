"use server";

import { z } from "zod";
import { GetEmojisQuery } from "./getEmojis.query";

const GetEmojisSchema = z.object({
  cursor: z.string().optional(),
  take: z.number().optional(),
});

export type Emoji = {
  id: string;
  prompt: string;
  originalUrl: string;
  slug: string;
  createdAt: Date;
};

export type GetEmojisResponse = {
  items: Emoji[];
  nextCursor: string | undefined;
};

export async function getEmojis(
  input: z.infer<typeof GetEmojisSchema>,
): Promise<GetEmojisResponse> {
  const validatedInput = GetEmojisSchema.parse(input);

  const response = await GetEmojisQuery(validatedInput);

  return {
    items: response.items
      .filter(
        (item): item is typeof item & { originalUrl: string } =>
          item.originalUrl !== null,
      )
      .map((item) => ({
        ...item,
        originalUrl: item.originalUrl,
      })),
    nextCursor: response.nextCursor,
  };
}
