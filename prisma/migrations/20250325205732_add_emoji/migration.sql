-- CreateTable
CREATE TABLE "Emoji" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,
    "originalUrl" TEXT,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_slug_key" ON "Emoji"("slug");
