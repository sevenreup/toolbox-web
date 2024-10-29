import exp from "constants";

export interface Service {
  title: string;
  description: string;
  url: string;
}

export interface Currency {
  name: string;
  code: string;
}

export interface EngineCapacity {
  name: string;
  code: string;
}

export interface DutyCalculationData {
  purposesVDP: string;
  estimatedTDE: string;
}

export interface InflationRateResult {
  data: InflationRate[];
}

export type InflationRate = {
  year: number;
  month: number;
  overall_cpi: number;
  overall_inflation: number;
  food_cpi: number;
  food_inflation: number;
  non_food_cpi: number;
  non_food_inflation: number;
}
