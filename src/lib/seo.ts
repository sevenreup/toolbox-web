import { LogoJsonLdProps } from "next-seo";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const SiteInfo = {
  title: "Toolbox",
  description: "A collection of different tools",
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
  const actualTitle = title ? `${title} | Seven Toolbox` : "Toolbox";
  return {
    title: actualTitle,
    description: description ?? "A collection of different tools",
    url: "http://tools.cphiri.dev",
    siteName: "Toolbox",
    images: [
      {
        url: "http://tools.cphiri.dev/og",
      },
    ],
    locale: "en_US",
    type: "website",
  };
};
