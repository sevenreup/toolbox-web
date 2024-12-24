export type InflationData = {
  year: number;
  month: number;
  overall_cpi: number;
  overall_inflation: number;
  food_cpi: number;
  food_inflation: number;
  non_food_cpi: number;
  non_food_inflation: number;
};

export type FormattedInflationData = {
  month: string; // Converted to month name
} & Omit<InflationData, "month">;

export type ChartType = "line" | "area" | "bar";

export interface MetricConfig {
  name: string;
  color: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Metrics {
  [key: string]: MetricConfig;
}

export interface VisibleMetrics {
  [key: string]: boolean;
}

export interface SummaryCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  description: string;
}

export interface PracticalExampleProps {
  inflationRate: number;
  baseAmount?: number;
}
