/*
  Warnings:

  - Added the required column `creatorId` to the `Emoji` table without a default value. This is not possible if the table is not empty.
  - Made the column `originalUrl` on table `Emoji` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Emoji" ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "downloadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isFlagged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noBackgroundUrl" TEXT,
ADD COLUMN     "safetyRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "originalUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmojiToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EmojiToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_EmojiToTag_B_index" ON "_EmojiToTag"("B");

-- CreateIndex
CREATE INDEX "Emoji_creatorId_idx" ON "Emoji"("creatorId");

-- CreateIndex
CREATE INDEX "Emoji_isFlagged_prompt_idx" ON "Emoji"("isFlagged", "prompt");

-- CreateIndex
CREATE INDEX "Emoji_isFlagged_viewCount_idx" ON "Emoji"("isFlagged", "viewCount");

-- CreateIndex
CREATE INDEX "Emoji_isFlagged_downloadCount_idx" ON "Emoji"("isFlagged", "downloadCount");

-- AddForeignKey
ALTER TABLE "Emoji" ADD CONSTRAINT "Emoji_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmojiToTag" ADD CONSTRAINT "_EmojiToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Emoji"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmojiToTag" ADD CONSTRAINT "_EmojiToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
