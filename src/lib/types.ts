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
