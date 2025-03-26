import { generateSlug } from "@/utils/format/id";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type CreateEmojiQueryProps = {
  data: CreateEmojiQueryInputType;
};

import { z } from "zod";

export const CreateEmojiQuerySchema = z.object({
  prompt: z.string(),
  originalUrl: z.string(),
  creatorId: z.string(),
  tags: z.array(z.string()),
});

export type CreateEmojiQueryInputType = z.infer<typeof CreateEmojiQuerySchema>;

export const CreateEmojiQuery = async ({ data }: CreateEmojiQueryProps) => {
  const emoji = await prisma.emoji.create({
    data: {
      ...data,
      tags: {
        connectOrCreate: data.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
      slug: generateSlug(data.prompt.toLowerCase().replace(/ /g, "-")),
    },
  });

  return emoji.slug;
};

export type CreateEmojiQuery = Prisma.PromiseReturnType<
  typeof CreateEmojiQuery
>;
