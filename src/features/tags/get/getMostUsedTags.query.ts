import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const GetMostUsedTagsQuery = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      emojis: {
        _count: "desc",
      },
    },
    take: 10,
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          emojis: true,
        },
      },
    },
  });

  return tags;
};

export type GetMostUsedTagsQueryType = Prisma.PromiseReturnType<
  typeof GetMostUsedTagsQuery
>;
