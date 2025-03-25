import type { LayoutParams } from "@type/next";
import { LandingNavbar } from "./_component/landingNavbar";

const RouteLayout = async ({ children }: LayoutParams) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default RouteLayout;
