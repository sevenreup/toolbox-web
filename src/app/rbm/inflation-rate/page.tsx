"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
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
import { InflationRate, InflationRateResult } from "@/lib/types";

const monthNames = [
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
];

type InflationRateFormatted = {
  month: string;
} & Omit<InflationRate, "month">;

const InflationDashboard = () => {
  const [data, setData] = useState<InflationRateFormatted[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available years (you might want to create a separate API endpoint for this)
    const currentYear = new Date().getFullYear();
    setYears(Array.from({ length: 5 }, (_, i) => currentYear - i));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/inflation?year=${selectedYear}`);
        const result: InflationRateResult = await response.json();
        const formattedData = result.data.map((item) => ({
          ...item,
          month: monthNames[item.month - 1],
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="container">
      <Card className="w-full mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Inflation Trends</CardTitle>
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={(year as any).toString()}>
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
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="overall_inflation"
                  stroke="#8884d8"
                  name="Overall Inflation"
                />
                <Line
                  type="monotone"
                  dataKey="food_inflation"
                  stroke="#82ca9d"
                  name="Food Inflation"
                />
                <Line
                  type="monotone"
                  dataKey="non_food_inflation"
                  stroke="#ffc658"
                  name="Non-food Inflation"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InflationDashboard;
