import { z } from "zod";

export const CreateEmojiSchema = z.object({
  prompt: z
    .string()
    .min(10, "Le prompt doit contenir au moins 10 caractères")
    .max(1000, "Le prompt ne doit pas dépasser 1000 caractères"),
  typeId: z.string({
    required_error: "Veuillez sélectionner un type d'emoji",
  }),
});

export type CreateEmojiSchema = z.infer<typeof CreateEmojiSchema>;