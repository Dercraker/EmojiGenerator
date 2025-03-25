import { LandingNavbar } from "@app/(landing)/_component/landingNavbar";
import type { LayoutParams } from "@type/next";

const RouteLayout = async ({ children }: LayoutParams) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default RouteLayout;
