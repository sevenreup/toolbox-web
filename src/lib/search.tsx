import { LogoJsonLd } from "next-seo";
import { LogoSEOInfo } from "./seo";

export const GeneralSeo = () => {
  return (
    <>
      <LogoJsonLd {...LogoSEOInfo} useAppDir={true} />
    </>
  );
};
