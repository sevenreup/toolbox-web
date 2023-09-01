import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/nav/site-header";
import { ThemeProvider } from "@/components/providers";
import Analytics from "@/components/analytics";
import { getOpenGraphData } from "@/lib/seo";
import { GeneralSeo } from "@/lib/search";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | Seven Toolbox", default: "Toolbox" },
  description: "A collection of different tools",
  generator: "CPhiri",
  applicationName: "Seven Toolbox",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Malawi",
    "Duty malawi",
    "postcodes malawi",
    "Tools",
    "Malawi tools",
    "Malawi toolbox",
    "Malawi postcodes",
    "Malawi duty",
    "Malawi tax",
    "Seven Toolbox",
  ],
  authors: [{ name: "Christopher", url: "http://www.cphiri.dev" }],
  metadataBase: new URL("http://tools.cphiri.dev"),
  colorScheme: "dark",
  creator: "Christopher Phiri",
  publisher: "Christopher Phiri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: getOpenGraphData({}),
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
        <GeneralSeo />
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
