import Replicate from 'replicate';

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateEmoji(prompt: string) {
  const output = await replicate.run(
    'fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e',
    {
      input: {
        prompt: `emoji of ${prompt}, simple, cute, flat design, vector style, white background`,
        negative_prompt:
          'realistic, 3d, photographic, photograph, high detail, text, watermark, signature, complex background',
        num_outputs: 1,
        scheduler: 'K_EULER',
        num_inference_steps: 50,
      },
    },
  );
  return output;
}
