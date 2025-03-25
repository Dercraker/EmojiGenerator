import { Layout, LayoutContent } from "@/components/layout/layout";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { GetEmojiBySlugQuery } from "@/features/emoji/get/getEmojiBySlug.query";
import type { PageParams } from "@/types/next";
import { Card } from "@ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CopyButton } from "./_components/CopyButton";
import { DownloadButton } from "./_components/DownloadButton";
import { ShareButton } from "./_components/ShareButton";

export default async function EmojiPage({
  params,
}: PageParams<{ emojiSlug: string }>) {
  const { emojiSlug } = await params;
  const emoji = await GetEmojiBySlugQuery({ slug: emojiSlug });

  if (!emoji?.originalUrl) {
    notFound();
  }

  return (
    <Layout className="container h-full pt-16">
      <LayoutContent>
        <Card className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="relative aspect-square bg-black">
            <Image
              src={emoji.originalUrl}
              alt={emoji.prompt}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="flex flex-col justify-between gap-4 p-6">
            <h1 className="text-2xl font-bold">{emoji.prompt}</h1>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Typography variant="muted">Created by</Typography>
                <Typography>UserName</Typography>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Typography variant="muted">Dimensions</Typography>
                <span>768×768</span>
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <Typography variant="muted">Date</Typography>
                <span>{new Date(emoji.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className=" flex gap-2">
              <ShareButton prompt={emoji.prompt} />
              <DownloadButton
                originalUrl={emoji.originalUrl}
                prompt={emoji.prompt}
              />
              <CopyButton originalUrl={emoji.originalUrl} />
            </div>
          </div>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
