import Replicate from "replicate";
import { env } from "./env/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateEmoji = async (prompt: string) => {
  const modelVersion =
    env.REPLICATE_MODEL_VERSION as `${string}/${string}:${string}`;

  const response = await replicate.run(modelVersion, {
    input: {
      width: 1024,
      height: 1024,
      prompt: `A TOK emoji of a ${prompt}`,
      negative_prompt: "racist, xenophobic, antisemitic, islamophobic, bigoted",
      refine: "no_refiner",
      scheduler: "K_EULER",
      lora_scale: 0.6,
      num_outputs: 1,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength: 0.8,
      num_inference_steps: 50,
    },
  });
  return response;
};
