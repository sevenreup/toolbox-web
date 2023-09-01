import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://tools.cphiri.dev",
      lastModified: new Date(),
    },
    {
      url: "http://tools.cphiri.dev/mra/duty-calculator",
      lastModified: new Date(),
    },
    {
      url: "http://tools.cphiri.dev/macra/postcodes",
      lastModified: new Date(),
    },
  ];
}
