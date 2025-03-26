import { z } from 'zod';

export const EmojiScalarFieldEnumSchema = z.enum(['id','slug','createdAt','updatedAt','prompt','originalUrl','noBackgroundUrl','safetyRating','isFlagged','viewCount','downloadCount','creatorId']);

export default EmojiScalarFieldEnumSchema;
