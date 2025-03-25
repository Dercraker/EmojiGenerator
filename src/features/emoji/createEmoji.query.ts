import { prisma } from '@/src/lib/prisma';
import type { Prisma } from '@prisma/client';

export const CreateEmojiQuery = async ({
  data,
}: {
  data: Prisma.EmojiCreateInput;
}) => {
  return prisma.emoji.create({
    data,
  });
};
