import { generateSlug } from "@/utils/format/id";
import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type CreateEmojiQueryProps = {
  data: Prisma.EmojiCreateInput;
};

export const CreateEmojiQuery = async ({ data }: CreateEmojiQueryProps) => {
  const emoji = await prisma.emoji.create({
    data: {
      ...data,
      slug: generateSlug(data.prompt.toLowerCase().replace(/ /g, "-")),
    },
  });

  return emoji.slug;
};

export type CreateEmojiQuery = Prisma.PromiseReturnType<
  typeof CreateEmojiQuery
>;
