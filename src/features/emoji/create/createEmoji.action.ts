"use server";

import { action, ActionError } from "@/lib/actions/safeActions";
import { generateEmoji } from "@/lib/replicate";
import { uploadthingClient } from "@/lib/uploadthing/uploadthingClient";
import { CreateEmojiQuery } from "./createEmoji.query";
import { CreateEmojiSchema } from "./createEmoji.schema";
export const CreateEmojiAction = action
  .schema(CreateEmojiSchema)
  .action(async ({ parsedInput: { prompt } }) => {
    const res = ((await generateEmoji(prompt)) as string[])[0];

    const blob = await new Response(res).blob();

    if (!blob) {
      throw new ActionError("Failed to generate emoji");
    }

    const file = new File([blob], "emoji.png", { type: "image/png" });
    const [uploadedFile] = await uploadthingClient.uploadFiles([file]);
    console.log("🚀 ~ .action ~ file:", file);

    if (!uploadedFile.data) {
      throw new ActionError("Failed to upload file");
    }

    const fileUrl = uploadedFile.data.ufsUrl;
    console.log("🚀 ~ .action ~ fileUrl:", fileUrl);

    const slug = await CreateEmojiQuery({
      data: {
        prompt,
        originalUrl: fileUrl,
      },
    });
    console.log("🚀 ~ .action ~ slug:", slug);

    return { slug };
  });
