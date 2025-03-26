import { z } from 'zod';
import { TagWithRelationsSchema, TagOptionalDefaultsWithRelationsSchema } from './TagSchema'
import type { TagWithRelations, TagOptionalDefaultsWithRelations } from './TagSchema'
import { UserWithRelationsSchema, UserOptionalDefaultsWithRelationsSchema } from './UserSchema'
import type { UserWithRelations, UserOptionalDefaultsWithRelations } from './UserSchema'

/////////////////////////////////////////
// EMOJI SCHEMA
/////////////////////////////////////////

export const EmojiSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  prompt: z.string(),
  originalUrl: z.string(),
  noBackgroundUrl: z.string().nullable(),
  safetyRating: z.number().int(),
  isFlagged: z.boolean(),
  viewCount: z.number().int(),
  downloadCount: z.number().int(),
  creatorId: z.string(),
})

export type Emoji = z.infer<typeof EmojiSchema>

/////////////////////////////////////////
// EMOJI OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const EmojiOptionalDefaultsSchema = EmojiSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  safetyRating: z.number().int().optional(),
  isFlagged: z.boolean().optional(),
  viewCount: z.number().int().optional(),
  downloadCount: z.number().int().optional(),
}))

export type EmojiOptionalDefaults = z.infer<typeof EmojiOptionalDefaultsSchema>

/////////////////////////////////////////
// EMOJI RELATION SCHEMA
/////////////////////////////////////////

export type EmojiRelations = {
  tags: TagWithRelations[];
  creator: UserWithRelations;
};

export type EmojiWithRelations = z.infer<typeof EmojiSchema> & EmojiRelations

export const EmojiWithRelationsSchema: z.ZodType<EmojiWithRelations> = EmojiSchema.merge(z.object({
  tags: z.lazy(() => TagWithRelationsSchema).array(),
  creator: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// EMOJI OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type EmojiOptionalDefaultsRelations = {
  tags: TagOptionalDefaultsWithRelations[];
  creator: UserOptionalDefaultsWithRelations;
};

export type EmojiOptionalDefaultsWithRelations = z.infer<typeof EmojiOptionalDefaultsSchema> & EmojiOptionalDefaultsRelations

export const EmojiOptionalDefaultsWithRelationsSchema: z.ZodType<EmojiOptionalDefaultsWithRelations> = EmojiOptionalDefaultsSchema.merge(z.object({
  tags: z.lazy(() => TagOptionalDefaultsWithRelationsSchema).array(),
  creator: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

export default EmojiSchema;
