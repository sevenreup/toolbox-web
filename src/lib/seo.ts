import { LogoJsonLdProps } from "next-seo";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const SiteInfo = {
  title: "Tools by Cphiri",
  description: "A collection of tools by Cphiri",
  baseUrl: "http://tools.cphiri.dev",
  logo: "http://tools.cphiri.dev/icon.svg",
};

export const LogoSEOInfo: LogoJsonLdProps = {
  logo: SiteInfo.logo,
  url: SiteInfo.baseUrl,
};

export const getOpenGraphData = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}): OpenGraph => {
  const actualTitle = title ? `${title} | Tools by Cphiri` : "Tools by Cphiri";
  return {
    title: actualTitle,
    description: description ?? "A collection of tools by Cphiri",
    url: "http://tools.cphiri.dev",
    siteName: "Tools by Cphiri",
    images: [
      {
        url: "http://tools.cphiri.dev/og",
      },
    ],
    locale: "en_US",
    type: "website",
  };
};
