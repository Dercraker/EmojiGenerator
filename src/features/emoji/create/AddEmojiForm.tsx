"use client";

import { LINKS } from "@/features/navigation/Links";
import { isActionSuccessful } from "@/lib/actions/actionUtils";
import { SubmitButton } from "@components/form/submitButton";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@ui/form";
import { Textarea } from "@ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateEmojiAction } from "./createEmoji.action";
import { CreateEmojiSchema } from "./createEmoji.schema";

export const AddEmojiForm = () => {
  const router = useRouter();
  const form = useZodForm({
    schema: CreateEmojiSchema,
    defaultValues: {
      prompt: "A cat on bike",
    },
  });

  const { mutate: addEmoji, isPending } = useMutation({
    mutationFn: async () => {
      const response = await CreateEmojiAction(form.getValues());

      if (!isActionSuccessful(response)) {
        toast.error(response?.serverError ?? "Something went wrong");
        return;
      }

      toast.success("Emoji created successfully");
      router.push(LINKS.Emoji.Emoji.href({ emojiSlug: response.data.slug }));

      return response.data;
    },
  });

  return (
    <Card className="w-full space-y-4 p-4">
      <Form
        form={form}
        onSubmit={() => {
          addEmoji();
        }}
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Describe the emoji you want to generate..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || isPending}
          isLoading={isPending}
        >
          {isPending ? "Création..." : "Créer"}
        </SubmitButton>
      </Form>
    </Card>
  );
};
