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
import type {
  ChartType,
  FormattedInflationData,
  InflationData,
  Metrics,
  VisibleMetrics,
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
  line: "Line Chart",
  area: "Area Chart",
  bar: "Bar Chart",
};

const metrics: Metrics = {
  overall_inflation: { name: "Overall Inflation", color: "#8884d8" },
  food_inflation: { name: "Food Inflation", color: "#82ca9d" },
  non_food_inflation: { name: "Non-food Inflation", color: "#ffc658" },
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
        const response = await fetch(`/api/inflation?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const formattedData: FormattedInflationData[] = result.data.map(
          (item: InflationData) => ({
            ...item,
            month: monthNames[item.month - 1],
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          <YAxis />
          <Tooltip />
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
                />
              )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <CardTitle>Inflation Trends</CardTitle>
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

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Chart Type</h4>
              <RadioGroup
                value={chartType}
                onValueChange={(value: ChartType) => setChartType(value)}
                className="flex gap-4"
              >
                {(Object.entries(chartTypes) as [ChartType, string][]).map(
                  ([type, label]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type}>{label}</Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Metrics</h4>
              <div className="flex flex-col gap-2">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
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
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            Loading...
          </div>
        ) : (
          renderChart()
        )}
      </CardContent>
    </Card>
  );
};

export default InflationDashboard;
