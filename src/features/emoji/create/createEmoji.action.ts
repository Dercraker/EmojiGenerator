'use server';

import { generateEmoji } from '@/src/lib/replicate';
import { revalidatePath } from 'next/cache';
import { authAction } from '../../../lib/safeAction/safe-action';
import { CreateEmojiQuery } from '../createEmoji.query';
import { CreateEmojiSchema } from './createEmoji.schema';

export const CreateEmojiAction = authAction
  .schema(CreateEmojiSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { prompt } = parsedInput;
      // Générer l'emoji avec Replicate
      const imageUrl = await generateEmoji(prompt);
      console.log('🚀 ~ .action ~ imageUrl:', imageUrl);

      if (!imageUrl || !Array.isArray(imageUrl) || !imageUrl[0]) {
        throw new Error('Failed to generate emoji');
      }

      // Créer l'emoji dans la base de données
      const emoji = await CreateEmojiQuery({
        data: {
          prompt,
          originalUrl: imageUrl[0],
          slug: `${prompt
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
        },
      });
      console.log('🚀 ~ .action ~ emoji:', emoji);

      revalidatePath('/');
      revalidatePath(`/emoji/${emoji.slug}`);

      return emoji;
    } catch (error) {
      console.error('[CREATE_EMOJI_ERROR]', error);
      throw new Error('Failed to create emoji');
    }
  });
