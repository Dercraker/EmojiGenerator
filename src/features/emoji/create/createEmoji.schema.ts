import { z } from "zod";

export const CreateEmojiSchema = z.object({
  prompt: z
    .string()
    .min(10, "The prompt must contain at least 10 characters")
    .max(1000, "The prompt must not exceed 1000 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export type CreateEmojiSchema = z.infer<typeof CreateEmojiSchema>;
