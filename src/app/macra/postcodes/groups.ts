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
    region: "north",
  },
  {
    name: "Karonga",
    codes: karongaCodes,
    region: "north",
  },
  {
    name: "Likoma",
    codes: likomaCodes,
    region: "north",
  },
  {
    name: "Mzimba",
    codes: mzimbaCodes,
    region: "north",
  },
  {
    name: "Nkhata Bay",
    codes: nkhata_bayCodes,
    region: "north",
  },
  {
    name: "Rumphi",
    codes: rumphiCodes,
    region: "north",
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
    region: "south",
  },
  {
    name: "Chikwawa",
    codes: chikwawaCodes,
    region: "south",
  },
  {
    name: "Chiradzulu",
    codes: chiradzuluCodes,
    region: "south",
  },
  {
    name: "Machinga",
    codes: machingaCodes,
    region: "south",
  },
  {
    name: "Mangochi Town",
    codes: mangochi_townCodes,
    region: "south",
  },
  {
    name: "Mangochi Rural",
    codes: mangochi_ruralCodes,
    region: "south",
  },
  {
    name: "Mulanje",
    codes: mulanjeCodes,
    region: "south",
  },
  {
    name: "Mwanza",
    codes: mwanzaCodes,
    region: "south",
  },
  {
    name: "Neno",
    codes: nenoCodes,
    region: "south",
  },
  {
    name: "Nsanje",
    codes: nsanjeCodes,
    region: "south",
  },
  {
    name: "Phalombe",
    codes: phalombeCodes,
    region: "south",
  },
  {
    name: "Thyolo",
    codes: thyoloCodes,
    region: "south",
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
