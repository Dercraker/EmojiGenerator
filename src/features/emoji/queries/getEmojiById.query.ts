import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

type GetEmojiByIdQueryProps = {
  id: string;
};

export const GetEmojiByIdQuery = async ({ id }: GetEmojiByIdQueryProps) => {
  const emoji = await prisma.emoji.findUnique({
    where: { id },
    include: {
      type: true,
      tags: true,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return emoji;
};

export type GetEmojiByIdQueryType = Prisma.PromiseReturnType<
  typeof GetEmojiByIdQuery
>;
