import { Service } from "@/lib/types";

export const allServices: Service[] = [
  {
    title: "Duty Import Calculator",
    description: "Calculate the cost of importing a car in Malawi",
    url: "/mra/duty-calculator",
  },
  {
    title: "PAYE Calculator",
    description: "Calculate your monthly PAYE tax in Malawi",
    url: "/mra/paye-calculator",
  },
  {
    title: "Malawi POSTCODES",
    description: "All post codes for malawi",
    url: "/macra/postcodes",
  },
  {
    title: "Malawi Inflation Rate",
    description: "Get the latest inflation rate in Malawi",
    url: "/rbm/inflation-rate",
  },
];
