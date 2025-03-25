"use server";

import { action } from "@/lib/actions/safeActions";
import { generateEmoji } from "@/lib/replicate";
import { CreateEmojiSchema } from "./createEmoji.schema";

export const CreateEmojiAction = action
  .schema(CreateEmojiSchema)
  .action(async ({ parsedInput: { prompt } }) => {
    const res = ((await generateEmoji(prompt)) as string[])[0];

    const blob = await new Response(res).blob();

    return { blob, url: URL.createObjectURL(blob) };
  });
