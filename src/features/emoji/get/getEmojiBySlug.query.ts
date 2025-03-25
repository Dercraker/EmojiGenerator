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
    },
  });

  return emoji;
};
