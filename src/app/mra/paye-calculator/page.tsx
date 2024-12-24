"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PayeResults = {
  breakdown: {
    bracket: string;
    amount: number;
    rate: number;
    tax: number;
  }[];
  totalTax: number;
  netIncome: number;
  grossIncome: number;
  period: string;
};

const PAYECalculator = () => {
  const [income, setIncome] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [taxBreakdown, setTaxBreakdown] = useState<PayeResults | null>(null);

  const calculatePAYE = (amount: number, inputPeriod: string): PayeResults => {
    // Convert to monthly if yearly input
    const monthlyAmount = inputPeriod === "yearly" ? amount / 12 : amount;

    const brackets = [
      { limit: 150000, rate: 0 },
      { limit: 350000, rate: 0.25 },
      { limit: 2050000, rate: 0.3 },
      { limit: Infinity, rate: 0.35 },
    ];

    let remainingIncome = monthlyAmount;
    let totalTax = 0;
    let breakdown = [];

    // First bracket (0%)
    const firstBracketAmount = Math.min(remainingIncome, brackets[0].limit);
    breakdown.push({
      bracket: `0 - ${brackets[0].limit.toLocaleString()}`,
      amount: firstBracketAmount,
      rate: brackets[0].rate * 100,
      tax: 0,
    });
    remainingIncome -= firstBracketAmount;

    // Second bracket (25%)
    if (remainingIncome > 0) {
      const secondBracketAmount = Math.min(remainingIncome, brackets[1].limit);
      const secondBracketTax = secondBracketAmount * brackets[1].rate;
      totalTax += secondBracketTax;
      breakdown.push({
        bracket: `${brackets[0].limit.toLocaleString()} - ${(
          brackets[0].limit + brackets[1].limit
        ).toLocaleString()}`,
        amount: secondBracketAmount,
        rate: brackets[1].rate * 100,
        tax: secondBracketTax,
      });
      remainingIncome -= secondBracketAmount;
    }

    // Third bracket (30%)
    if (remainingIncome > 0) {
      const thirdBracketAmount = Math.min(remainingIncome, brackets[2].limit);
      const thirdBracketTax = thirdBracketAmount * brackets[2].rate;
      totalTax += thirdBracketTax;
      breakdown.push({
        bracket: `${(
          brackets[0].limit + brackets[1].limit
        ).toLocaleString()} - ${(
          brackets[0].limit +
          brackets[1].limit +
          brackets[2].limit
        ).toLocaleString()}`,
        amount: thirdBracketAmount,
        rate: brackets[2].rate * 100,
        tax: thirdBracketTax,
      });
      remainingIncome -= thirdBracketAmount;
    }

    // Fourth bracket (35%)
    if (remainingIncome > 0) {
      const fourthBracketTax = remainingIncome * brackets[3].rate;
      totalTax += fourthBracketTax;
      breakdown.push({
        bracket: `Above ${(
          brackets[0].limit +
          brackets[1].limit +
          brackets[2].limit
        ).toLocaleString()}`,
        amount: remainingIncome,
        rate: brackets[3].rate * 100,
        tax: fourthBracketTax,
      });
    }

    // Calculate yearly values if yearly was selected
    const multiplier = inputPeriod === "yearly" ? 12 : 1;

    return {
      breakdown,
      totalTax: totalTax * multiplier,
      netIncome: (monthlyAmount - totalTax) * multiplier,
      grossIncome: monthlyAmount * multiplier,
      period: inputPeriod,
    };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result = calculatePAYE(parseFloat(income), period);
    setTaxBreakdown(result);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>PAYE Tax Calculator</CardTitle>
        <CardDescription>
          Calculate your Pay As You Earn (PAYE) tax based on 2024 rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Gross Income (MK)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Calculate Tax
          </Button>
        </form>

        {taxBreakdown && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">
                Tax Breakdown (
                {taxBreakdown.period === "yearly" ? "Yearly" : "Monthly"})
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-4 text-sm font-medium">
                  <span>Bracket</span>
                  <span>Rate</span>
                  <span>Amount</span>
                  <span>Tax</span>
                </div>
                {taxBreakdown.breakdown.map((bracket, index) => (
                  <div key={index} className="grid grid-cols-4 text-sm">
                    <span>MK {bracket.bracket}</span>
                    <span>{bracket.rate}%</span>
                    <span>MK {bracket.amount.toLocaleString()}</span>
                    <span>MK {bracket.tax.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Gross Income</h4>
                <p className="text-lg">
                  MK {taxBreakdown.grossIncome.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Total Tax</h4>
                <p className="text-lg">
                  MK {taxBreakdown.totalTax.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Net Income</h4>
                <p className="text-lg">
                  MK {taxBreakdown.netIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PAYECalculator;
