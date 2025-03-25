import { z } from 'zod';

/////////////////////////////////////////
// EMOJI SCHEMA
/////////////////////////////////////////

export const EmojiSchema = z.object({
  id: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  prompt: z.string(),
  originalUrl: z.string().nullable(),
})

export type Emoji = z.infer<typeof EmojiSchema>

/////////////////////////////////////////
// EMOJI OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const EmojiOptionalDefaultsSchema = EmojiSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type EmojiOptionalDefaults = z.infer<typeof EmojiOptionalDefaultsSchema>

export default EmojiSchema;
