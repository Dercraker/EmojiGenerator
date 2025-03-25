"use client";

import type { GetEmojisResponse } from "@/features/emoji/actions/getEmojis.action";
import { GetEmojisAction } from "@/features/emoji/actions/getEmojis.action";
import { LINKS } from "@/features/navigation/Links";
import { isActionSuccessful } from "@/lib/actions/actionUtils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card } from "@ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { EmojiGridLoader } from "./emojiGrid.loader";

export const EmojiGrid = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<GetEmojisResponse>({
      queryKey: ["emojis"],
      queryFn: async ({ pageParam }) => {
        const res = await GetEmojisAction({ cursor: pageParam as string });
        if (!isActionSuccessful(res)) throw new Error(res?.serverError);
        return res.data;
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <EmojiGridLoader />;
  }

  if (status === "error") {
    return <div>Error loading emojis</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.pages.map((page) =>
          page.items.map((emoji) => (
            <Link
              key={emoji.id}
              href={LINKS.Emoji.Emoji.href({ emojiSlug: emoji.slug })}
            >
              <Card className="group relative aspect-square overflow-hidden">
                <Image
                  src={emoji.originalUrl as string}
                  alt={emoji.prompt}
                  fill
                  className="object-contain p-4 transition-transform duration-200 group-hover:scale-110"
                />
              </Card>
            </Link>
          )),
        )}
      </div>

      <div ref={ref} className="mt-8">
        {isFetchingNextPage && <EmojiGridLoader />}
      </div>
    </>
  );
};
