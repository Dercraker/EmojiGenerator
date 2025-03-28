import { Footer } from "@/components/layout/footer";
import { NextTopLoader } from "@components/page/nextTopLoader";
import { TailwindIndicator } from "@components/utils/tailwindDevIndicator";
import { cn } from "@lib/utils";
import type { LayoutParams } from "@type/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: LayoutParams) => {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "h-full bg-background font-sans antialiased",
          geistMono.variable,
          geistSans.variable,
        )}
      >
        <Providers>
          {children}
          <TailwindIndicator />
          <NextTopLoader />
        </Providers>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
