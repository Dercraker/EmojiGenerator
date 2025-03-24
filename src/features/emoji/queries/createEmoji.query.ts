import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

type CreateEmojiQueryProps = {
  prompt: string;
  originalUrl: string;
  typeId: string;
  creatorId: string;
  noBackgroundUrl?: string;
  tagIds?: string[];
};

export const CreateEmojiQuery = async ({
  prompt,
  originalUrl,
  typeId,
  creatorId,
  noBackgroundUrl,
  tagIds,
}: CreateEmojiQueryProps) => {
  const emoji = await prisma.emoji.create({
    data: {
      prompt,
      originalUrl,
      noBackgroundUrl,
      typeId,
      creatorId,
      tags: tagIds
        ? {
            connect: tagIds.map(id => ({ id })),
          }
        : undefined,
    },
    include: {
      type: true,
      tags: true,
      creator: true,
    },
  });

  return emoji;
};

export type CreateEmojiQueryType = Prisma.PromiseReturnType<
  typeof CreateEmojiQuery
>;
