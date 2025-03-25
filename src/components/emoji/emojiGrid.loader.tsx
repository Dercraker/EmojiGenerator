import { Skeleton } from "@ui/skeleton";

export const EmojiGridLoader = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square">
          <Skeleton className="size-full" />
        </div>
      ))}
    </div>
  );
};
