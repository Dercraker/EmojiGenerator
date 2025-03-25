import { Footer } from "@components/layout/footer";
import { HeaderBase } from "@components/layout/header-base";
import type { LayoutParams } from "@type/next";

const RouteLayout = async ({ children, params }: LayoutParams) => {
  return (
    <div className="flex min-h-full flex-col">
      <HeaderBase />
      <div className="min-h-full flex-1 pb-16 ">{children}</div>
      <Footer />
    </div>
  );
};

export default RouteLayout;
