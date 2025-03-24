import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

type GetEmojisQueryProps = {
  where?: Prisma.EmojiWhereInput;
  orderBy?: Prisma.EmojiOrderByWithRelationInput;
  take?: number;
  skip?: number;
};

export const GetEmojisQuery = async ({
  where,
  orderBy = { createdAt: 'desc' },
  take = 20,
  skip = 0,
}: GetEmojisQueryProps = {}) => {
  const [emojis, total] = await Promise.all([
    prisma.emoji.findMany({
      where,
      orderBy,
      take,
      skip,
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
    }),
    prisma.emoji.count({ where }),
  ]);

  return {
    emojis,
    total,
    hasMore: skip + take < total,
  };
};

export type GetEmojisQueryType = Prisma.PromiseReturnType<
  typeof GetEmojisQuery
>;
