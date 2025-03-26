"use server";

import { ActionError, authAction } from "@/lib/actions/safeActions";
import { generateEmoji } from "@/lib/replicate";
import { uploadthingClient } from "@/lib/uploadthing/uploadthingClient";
import { nanoid } from "nanoid";
import { CreateEmojiQuery } from "./createEmoji.query";
import { CreateEmojiSchema } from "./createEmoji.schema";
export const CreateEmojiAction = authAction
  .schema(CreateEmojiSchema)
  .action(async ({ parsedInput: { prompt }, ctx: { user } }) => {
    const res = ((await generateEmoji(prompt)) as string[])[0];

    const blob = await new Response(res).blob();

    if (!blob) {
      throw new ActionError("Failed to generate emoji");
    }

    const file = new File([blob], `emoji-${nanoid()}.png`, {
      type: "image/png",
    });
    const [uploadedFile] = await uploadthingClient.uploadFiles([file]);

    if (!uploadedFile.data) {
      throw new ActionError("Failed to upload file");
    }

    const fileUrl = uploadedFile.data.ufsUrl;

    const slug = await CreateEmojiQuery({
      data: {
        prompt,
        originalUrl: fileUrl,
        creatorId: user.id,
      },
    });

    return { slug };
  });
