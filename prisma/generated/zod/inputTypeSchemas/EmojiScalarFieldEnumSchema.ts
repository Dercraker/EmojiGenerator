import { z } from 'zod';

export const EmojiScalarFieldEnumSchema = z.enum(['id','slug','createdAt','updatedAt','prompt','originalUrl']);

export default EmojiScalarFieldEnumSchema;
