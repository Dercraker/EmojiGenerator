import { EmojiGrid } from "@/components/emoji/EmojiGrid";
import { Layout, LayoutContent } from "@components/layout/layout";
import type { PageParams } from "@type/next";
import { Hero } from "./_component/hero";

const RoutePage = (props: PageParams) => {
  return (
    <>
      <Hero />
      <Layout size="lg">
        <LayoutContent>
          <h1 className="mb-8 text-3xl font-bold">Discover Emojis</h1>
          <EmojiGrid />
        </LayoutContent>
      </Layout>
    </>
  );
};

export default RoutePage;
