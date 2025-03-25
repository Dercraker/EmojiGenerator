import { z } from 'zod';
import { SessionWithRelationsSchema, SessionOptionalDefaultsWithRelationsSchema } from './SessionSchema'
import type { SessionWithRelations, SessionOptionalDefaultsWithRelations } from './SessionSchema'
import { AccountWithRelationsSchema, AccountOptionalDefaultsWithRelationsSchema } from './AccountSchema'
import type { AccountWithRelations, AccountOptionalDefaultsWithRelations } from './AccountSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  sessions: SessionWithRelations[];
  accounts: AccountWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOptionalDefaultsRelations = {
  sessions: SessionOptionalDefaultsWithRelations[];
  accounts: AccountOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  sessions: z.lazy(() => SessionOptionalDefaultsWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountOptionalDefaultsWithRelationsSchema).array(),
}))

export default UserSchema;
