import { prisma } from "@/lib/prisma";

type GetEmojiBySlugQueryProps = {
  slug: string;
};

export const GetEmojiBySlugQuery = async ({
  slug,
}: GetEmojiBySlugQueryProps) => {
  const emoji = await prisma.emoji.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      prompt: true,
      originalUrl: true,
      createdAt: true,
      slug: true,
      creatorId: true,
      downloadCount: true,
      isFlagged: true,
      noBackgroundUrl: true,
      updatedAt: true,
      viewCount: true,
      tags: true,
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return emoji;
};
