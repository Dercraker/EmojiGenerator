import { z } from 'zod';
import { EmojiWithRelationsSchema, EmojiOptionalDefaultsWithRelationsSchema } from './EmojiSchema'
import type { EmojiWithRelations, EmojiOptionalDefaultsWithRelations } from './EmojiSchema'

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// TAG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TagOptionalDefaultsSchema = TagSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TagOptionalDefaults = z.infer<typeof TagOptionalDefaultsSchema>

/////////////////////////////////////////
// TAG RELATION SCHEMA
/////////////////////////////////////////

export type TagRelations = {
  emojis: EmojiWithRelations[];
};

export type TagWithRelations = z.infer<typeof TagSchema> & TagRelations

export const TagWithRelationsSchema: z.ZodType<TagWithRelations> = TagSchema.merge(z.object({
  emojis: z.lazy(() => EmojiWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TAG OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TagOptionalDefaultsRelations = {
  emojis: EmojiOptionalDefaultsWithRelations[];
};

export type TagOptionalDefaultsWithRelations = z.infer<typeof TagOptionalDefaultsSchema> & TagOptionalDefaultsRelations

export const TagOptionalDefaultsWithRelationsSchema: z.ZodType<TagOptionalDefaultsWithRelations> = TagOptionalDefaultsSchema.merge(z.object({
  emojis: z.lazy(() => EmojiOptionalDefaultsWithRelationsSchema).array(),
}))

export default TagSchema;
