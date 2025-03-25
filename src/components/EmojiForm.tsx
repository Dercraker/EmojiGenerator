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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import { CreateEmojiAction } from '@/src/features/emoji/create/createEmoji.action';
import { CreateEmojiSchema } from '@/src/features/emoji/create/createEmoji.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

      if (result.data) {
        toast.success('Emoji généré avec succès !');
        router.push(`/emoji/${result.data.id}`);
      } else {
        toast.error(result.serverError || 'Une erreur est survenue');
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la génération de l'emoji");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type d'emoji" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Emoji Simple</SelectItem>
                      <SelectItem value="2">Emoji Animé</SelectItem>
                      <SelectItem value="3">Emoji Personnage</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
  );
}
