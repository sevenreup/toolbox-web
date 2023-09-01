import { Metadata } from "next";
import DutyForm from "./form";
import { getOpenGraphData } from "@/lib/seo";

export default function Page() {
  return (
    <div className="flex container h-full flex-col items-center justify-center">
      <div className="w-full p-2 border-0 lg:w-1/2 lg:p-8 lg:border">
        <DutyForm />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Duty Import Calculator",
  description: "Calculate the cost of importing a car in Malawi",
  openGraph: getOpenGraphData({
    title: "Duty Import Calculator",
    description: "Calculate the cost of importing a car in Malawi",
  }),
};

export const runtime = "edge";
