import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/nav/site-header";
import { ThemeProvider } from "@/components/providers";
import Analytics from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden h-full">
      <body
        className={cn(
          "h-full  bg-background font-sans antialiased",
          inter.className
        )}
      >
        {process.env.NEXT_PUBLIC_MEASUREMENT_ID && (
          <Analytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_MEASUREMENT_ID as string}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
