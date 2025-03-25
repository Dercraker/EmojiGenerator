'use client';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Textarea } from '@/src/components/ui/textarea';
import { CreateEmojiAction } from '@/src/features/emoji/create/createEmoji.action';
import { CreateEmojiSchema } from '@/src/features/emoji/create/createEmoji.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isActionSuccessful } from '../lib/safeAction/action-utils';

export function EmojiForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateEmojiSchema>({
    resolver: zodResolver(CreateEmojiSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: CreateEmojiSchema) {
    try {
      setIsLoading(true);
      const result = await CreateEmojiAction(values);
      console.log('🚀 ~ onSubmit ~ result:', result);

      if (isActionSuccessful(result)) {
        toast.success('Emoji généré avec succès !');
        router.push(`/emoji/${result.data.id}`);
      } else {
        toast.error(result?.serverError || 'Une erreur est survenue');
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la génération de l'emoji");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez l'emoji que vous souhaitez générer..."
                      className="min-h-[100px] resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Soyez précis dans votre description pour obtenir le meilleur
                    résultat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !form.formState.isValid}>
              {isLoading ? 'Génération en cours...' : "Générer l'emoji"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
