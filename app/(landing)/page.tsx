import { Layout, LayoutContent } from "@components/layout/layout";
import type { PageParams } from "@type/next";
import { Hero } from "./_component/hero";
import { LandingFooter } from "./_component/landingFooter";

const RoutePage = (props: PageParams) => {
  return (
    <>
      <Hero />
      <Layout size="lg">
        <LayoutContent></LayoutContent>
      </Layout>
      <LandingFooter />
    </>
  );
};

export default RoutePage;
