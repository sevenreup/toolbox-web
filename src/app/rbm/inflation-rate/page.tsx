"use client";

import React, { useState, useEffect, JSX } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUp,
  ShoppingCart,
  Package,
} from "lucide-react";
import type {
  ChartType,
  FormattedInflationData,
  Metrics,
  VisibleMetrics,
  SummaryCardProps,
  PracticalExampleProps,
  InflationData,
} from "@/types/inflation";

const monthNames: readonly string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const chartTypes: Record<ChartType, string> = {
  line: "Trend Over Time",
  area: "Cumulative View",
  bar: "Monthly Comparison",
};

const metrics: Metrics = {
  overall_inflation: {
    name: "Overall Cost of Living",
    color: "#8884d8",
    description: "The general increase in prices across all goods and services",
    icon: TrendingUp,
  },
  food_inflation: {
    name: "Food Prices",
    color: "#82ca9d",
    description: "How much more you're paying for groceries and food items",
    icon: ShoppingCart,
  },
  non_food_inflation: {
    name: "Other Goods & Services",
    color: "#ffc658",
    description:
      "Price changes in non-food items like housing, transport, and utilities",
    icon: Package,
  },
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  previousValue,
  icon,
  description,
}) => {
  const change = value - previousValue;
  const isPositive = change > 0;

  return (
    <Card className="flex-1">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-red-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
            )}
            <span
              className={`text-sm MK{
                isPositive ? "text-red-500" : "text-green-500"
              }`}
            >
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4">{value.toFixed(1)}%</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PracticalExample: React.FC<PracticalExampleProps> = ({
  inflationRate,
  baseAmount = 100,
}) => {
  const newAmount = baseAmount * (1 + inflationRate / 100);
  const difference = newAmount - baseAmount;
  const purchasingPower = (baseAmount / newAmount) * 100;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">What This Means For You</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              If something cost MK{baseAmount.toFixed(2)} last year:
            </p>
            <p className="text-lg font-medium mt-1">
              It now costs MK{newAmount.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Impact on Your Wallet:</p>
            <ul className="text-sm space-y-1">
              <li className="flex items-center text-red-500">
                <ArrowUpIcon className="h-4 w-4 mr-2" />
                Costs MK{difference.toFixed(2)} more than before
              </li>
              <li className="flex items-center text-amber-500">
                <TrendingUp className="h-4 w-4 mr-2" />
                Your money is worth {purchasingPower.toFixed(1)}% of what it was
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InflationDashboard: React.FC = () => {
  const [data, setData] = useState<FormattedInflationData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartType, setChartType] = useState<ChartType>("line");
  const [visibleMetrics, setVisibleMetrics] = useState<VisibleMetrics>({
    overall_inflation: true,
    food_inflation: true,
    non_food_inflation: true,
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYears(Array.from({ length: 5 }, (_, i) => currentYear - i));
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(`/api/inflation?year=MK{selectedYear}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        const formattedData: FormattedInflationData[] = result.data.map(
          (item: InflationData) => ({
            ...item,
            month: monthNames[item.month - 1],
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedYear]);

  const toggleMetric = (metric: string): void => {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const getLatestValues = () => {
    if (data.length === 0) return null;
    const latest = data[data.length - 1];
    const previous = data[data.length - 2] || data[data.length - 1];
    return { latest, previous };
  };

  const renderChart = (): JSX.Element => {
    const ChartComponent = {
      line: LineChart,
      area: AreaChart,
      bar: BarChart,
    }[chartType];

    const DataComponent = {
      line: Line,
      area: Area,
      bar: Bar,
    }[chartType];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `MK{value}%`}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {Object.entries(metrics).map(
            ([key, value]) =>
              visibleMetrics[key] && (
                <DataComponent
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={value.name}
                  stroke={value.color}
                  fill={value.color}
                  fillOpacity={chartType === "area" ? 0.3 : 1}
                />
              )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  const renderSummaryCards = () => {
    const values = getLatestValues();
    if (!values) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(metrics).map(([key, value]) => (
          <SummaryCard
            key={key}
            title={value.name}
            value={values.latest[key as keyof FormattedInflationData] as number}
            previousValue={
              values.previous[key as keyof FormattedInflationData] as number
            }
            icon={<value.icon className="text-primary" />}
            description={value.description}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Understanding Inflation Trends</CardTitle>
            <Select
              value={selectedYear.toString()}
              onValueChange={(value: string) =>
                setSelectedYear(parseInt(value))
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <>
              {renderSummaryCards()}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">{renderChart()}</div>
                <div className="space-y-6">
                  <PracticalExample
                    inflationRate={
                      data[data.length - 1]?.overall_inflation || 0
                    }
                    baseAmount={100}
                  />
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Customize View</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Chart Style
                          </h4>
                          <RadioGroup
                            value={chartType}
                            onValueChange={(value: ChartType) =>
                              setChartType(value)
                            }
                            className="flex flex-col gap-2"
                          >
                            {(
                              Object.entries(chartTypes) as [
                                ChartType,
                                string
                              ][]
                            ).map(([type, label]) => (
                              <div
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem value={type} id={type} />
                                <Label htmlFor={type}>{label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Show/Hide Metrics
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(metrics).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center space-x-2"
                              >
                                <Switch
                                  checked={visibleMetrics[key]}
                                  onCheckedChange={() => toggleMetric(key)}
                                  id={key}
                                />
                                <Label htmlFor={key}>{value.name}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InflationDashboard;
