'use server';

import { prisma } from '@/src/lib/prisma';
import { generateEmoji } from '@/src/lib/replicate';
import { revalidatePath } from 'next/cache';
import { authAction } from '../../../lib/safe-action';
import { CreateEmojiSchema } from './createEmoji.schema';

export const CreateEmojiAction = authAction
  .schema(CreateEmojiSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const { prompt, typeId } = parsedInput;
      const { user } = ctx;
      // Générer l'emoji avec Replicate
      const imageUrl = await generateEmoji(prompt);

      if (!imageUrl || !Array.isArray(imageUrl) || !imageUrl[0]) {
        throw new Error('Failed to generate emoji');
      }

      // Créer l'emoji dans la base de données
      const emoji = await prisma.emoji.create({
        data: {
          prompt,
          originalUrl: imageUrl[0],
          typeId,
          creatorId: user.id,
          slug: `${prompt
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
        },
        include: {
          type: true,
          creator: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      revalidatePath('/');
      revalidatePath(`/emoji/${emoji.id}`);

      return emoji;
    } catch (error) {
      console.error('[CREATE_EMOJI_ERROR]', error);
      throw new Error('Failed to create emoji');
    }
  });
