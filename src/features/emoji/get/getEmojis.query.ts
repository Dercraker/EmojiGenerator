import { prisma } from "@/lib/prisma";

type GetEmojisQueryProps = {
  cursor?: string;
  take?: number;
};

export const GetEmojisQuery = async ({
  cursor,
  take = 12,
}: GetEmojisQueryProps) => {
  const items = await prisma.emoji.findMany({
    take: take,
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }
      : {}),
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      prompt: true,
      originalUrl: true,
      createdAt: true,
      slug: true,
    },
  });

  return {
    items,
    nextCursor: items.length === take ? items[items.length - 1].id : undefined,
  };
};
