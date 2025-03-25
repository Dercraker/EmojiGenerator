import { Logo } from "@components/logo/logo";
import type { PropsWithChildren } from "react";
import { Layout } from "./layout";

export function HeaderBase({ children }: PropsWithChildren) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-neutral-950 px-4 lg:h-[60px] lg:px-6">
      <Layout className="my-2">
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">{children}</nav>
        </div>
      </Layout>
    </header>
  );
}
