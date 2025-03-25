/*
  Warnings:

  - You are about to drop the column `downloadCount` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `noBackgroundUrl` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `safetyRating` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the `EmojiType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmojiToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_typeId_fkey";

-- DropForeignKey
ALTER TABLE "_EmojiToTag" DROP CONSTRAINT "_EmojiToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmojiToTag" DROP CONSTRAINT "_EmojiToTag_B_fkey";

-- DropIndex
DROP INDEX "Emoji_downloadCount_idx";

-- DropIndex
DROP INDEX "Emoji_isPublic_createdAt_idx";

-- DropIndex
DROP INDEX "Emoji_safetyRating_createdAt_idx";

-- DropIndex
DROP INDEX "Emoji_typeId_idx";

-- DropIndex
DROP INDEX "Emoji_viewCount_idx";

-- AlterTable
ALTER TABLE "Emoji" DROP COLUMN "downloadCount",
DROP COLUMN "error",
DROP COLUMN "isPublic",
DROP COLUMN "noBackgroundUrl",
DROP COLUMN "safetyRating",
DROP COLUMN "typeId",
DROP COLUMN "updatedAt",
DROP COLUMN "viewCount";

-- DropTable
DROP TABLE "EmojiType";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_EmojiToTag";

-- CreateIndex
CREATE INDEX "Emoji_prompt_idx" ON "Emoji"("prompt");
