import { Currency, EngineCapacity } from "@/lib/types";

export const siteConfig = {
  name: "Tools",
};

export const supportedCurrency: Currency[] = [
  {
    name: "US Dollar",
    code: "USD",
  },
  {
    name: "British Pound",
    code: "GBP",
  },
  {
    name: "South Afrcian Rand",
    code: "ZAR",
  },
  {
    name: "Euro",
    code: "EUR",
  },
  {
    name: "Australian Dollar",
    code: "AUD",
  },
  {
    name: "Japanese Yen",
    code: "JPY",
  },
];

export const supportedEngineCapacity: EngineCapacity[] = [
  {
    name: "0 - 999",
    code: "0 - 999",
  },
  {
    name: "1000 - 1499",
    code: "1000 - 1499",
  },
  {
    name: "1500 - 1999",
    code: "1500 - 1999",
  },
  {
    name: "2000 - 2499",
    code: "2000 - 2499",
  },
  {
    name: "2500 - 2999",
    code: "2500 - 2999",
  },
  {
    name: "Exceeding 3000",
    code: "Exceeding 3000",
  },
];
