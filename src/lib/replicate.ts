import Replicate from 'replicate';

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateEmoji(prompt: string) {
  const output = await replicate.predictions.create({
    version: 'dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e',
    input: {
      width: 1024,
      height: 1024,
      prompt: `emoji of ${prompt}, simple, cute, flat design, vector style, white background`,
      negative_prompt:
        'realistic, 3d, photographic, photograph, high detail, text, watermark, signature, complex background',
      refine: 'no_refiner',
      scheduler: 'K_EULER',
      lora_scale: 0.6,
      num_outputs: 1,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength: 0.8,
      num_inference_steps: 50,
    },
  });

  console.log('🚀 ~ generateEmoji ~ output:', output);
  return output;
}
