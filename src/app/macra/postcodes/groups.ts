import {
  balakaCodes,
  blantyre_ruralCodes,
  blantyre_urbanCodes,
  chikwawaCodes,
  chiradzuluCodes,
  chitipaCodes,
  dedzaCodes,
  dowaCodes,
  karongaCodes,
  kasungu_municipalityCodes,
  kasungu_ruralCodes,
  likomaCodes,
  lilongwe_ruralCodes,
  lilongwe_urbanCodes,
  machingaCodes,
  mangochi_ruralCodes,
  mangochi_townCodes,
  mchinjiCodes,
  mulanjeCodes,
  mwanzaCodes,
  mzimbaCodes,
  mzuzuCodes,
  nenoCodes,
  nkhata_bayCodes,
  nkhota_kotaCodes,
  nsanjeCodes,
  ntcheuCodes,
  ntchisiCodes,
  phalombeCodes,
  rumphiCodes,
  salimaCodes,
  thyoloCodes,
  zomba_ruralCodes,
  zomba_urbanCodes,
} from "./codes";
import { PostCodeData, PostGroup } from "./model";

export const postGroups: PostGroup[] = [
  {
    name: "Lilongwe Urban",
    codes: lilongwe_urbanCodes,
    region: "central",
  },
  {
    name: "Lilongwe Rural",
    codes: lilongwe_ruralCodes,
    region: "central",
  },
  {
    name: "Blantyre Urban",
    codes: blantyre_urbanCodes,
    region: "south",
  },
  {
    name: "Blantyre Rural",
    codes: blantyre_ruralCodes,
    region: "south",
  },
  {
    name: "Mzuzu",
    codes: mzuzuCodes,
    region: "north",
  },
  {
    name: "Zomba Rural",
    codes: zomba_ruralCodes,
    region: "south",
  },
  {
    name: "Zomba Urban",
    codes: zomba_urbanCodes,
    region: "south",
  },
  {
    name: "Chitipa",
    codes: chitipaCodes,
    region: "central",
  },
  {
    name: "Karonga",
    codes: karongaCodes,
    region: "central",
  },
  {
    name: "Likoma",
    codes: likomaCodes,
    region: "central",
  },
  {
    name: "Mzimba",
    codes: mzimbaCodes,
    region: "central",
  },
  {
    name: "Nkhata Bay",
    codes: nkhata_bayCodes,
    region: "central",
  },
  {
    name: "Rumphi",
    codes: rumphiCodes,
    region: "central",
  },
  {
    name: "Dedza",
    codes: dedzaCodes,
    region: "central",
  },
  {
    name: "Dowa",
    codes: dowaCodes,
    region: "central",
  },
  {
    name: "kasungu Municipality",
    codes: kasungu_municipalityCodes,
    region: "central",
  },
  {
    name: "Kasungu rural",
    codes: kasungu_ruralCodes,
    region: "central",
  },
  {
    name: "Mchinji",
    codes: mchinjiCodes,
    region: "central",
  },
  {
    name: "Nkhotakota",
    codes: nkhota_kotaCodes,
    region: "central",
  },
  {
    name: "Ntcheu",
    codes: ntcheuCodes,
    region: "central",
  },
  {
    name: "Ntchisi",
    codes: ntchisiCodes,
    region: "central",
  },
  {
    name: "Salima",
    codes: salimaCodes,
    region: "central",
  },
  {
    name: "Balaka",
    codes: balakaCodes,
    region: "central",
  },
  {
    name: "Chikwawa",
    codes: chikwawaCodes,
    region: "central",
  },
  {
    name: "Chiradzulu",
    codes: chiradzuluCodes,
    region: "central",
  },
  {
    name: "Machinga",
    codes: machingaCodes,
    region: "central",
  },
  {
    name: "Mangochi Town",
    codes: mangochi_townCodes,
    region: "central",
  },
  {
    name: "Mangochi Rural",
    codes: mangochi_ruralCodes,
    region: "central",
  },
  {
    name: "Mulanje",
    codes: mulanjeCodes,
    region: "central",
  },
  {
    name: "Mwanza",
    codes: mwanzaCodes,
    region: "central",
  },
  {
    name: "Neno",
    codes: nenoCodes,
    region: "central",
  },
  {
    name: "Nsanje",
    codes: nsanjeCodes,
    region: "central",
  },
  {
    name: "Phalombe",
    codes: phalombeCodes,
    region: "central",
  },
  {
    name: "Thyolo",
    codes: thyoloCodes,
    region: "central",
  },
];

export const flattenPostCodes = (): PostCodeData[] => {
  const flattened: PostCodeData[] = [];
  postGroups.forEach((group) => {
    group.codes.forEach((code) => {
      flattened.push({
        name: code.name,
        code: code.code,
        region: group.region,
        group: group.name,
      });
    });
  });
  return flattened;
};
