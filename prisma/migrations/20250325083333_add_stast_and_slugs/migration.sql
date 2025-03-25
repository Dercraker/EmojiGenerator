/*
  Warnings:

  - You are about to drop the column `isFeatured` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `isFlagged` on the `Emoji` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Emoji` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `EmojiType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Emoji` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `EmojiType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emoji" DROP COLUMN "isFeatured",
DROP COLUMN "isFlagged",
ADD COLUMN     "downloadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "EmojiType" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_slug_key" ON "Emoji"("slug");

-- CreateIndex
CREATE INDEX "Emoji_isPublic_createdAt_idx" ON "Emoji"("isPublic", "createdAt");

-- CreateIndex
CREATE INDEX "Emoji_safetyRating_createdAt_idx" ON "Emoji"("safetyRating", "createdAt");

-- CreateIndex
CREATE INDEX "Emoji_viewCount_idx" ON "Emoji"("viewCount");

-- CreateIndex
CREATE INDEX "Emoji_downloadCount_idx" ON "Emoji"("downloadCount");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiType_slug_key" ON "EmojiType"("slug");

-- CreateIndex
CREATE INDEX "EmojiType_slug_idx" ON "EmojiType"("slug");
