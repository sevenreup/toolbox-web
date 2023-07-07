import { DutyCalculationData } from "@/lib/types";

export default function DutyResults({ data }: { data: DutyCalculationData }) {
  return (
    <div className="bg-muted p-4 rounded-md">
      <h4 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
        Results
      </h4>
      <div className="flex flex-col gap-2">
        <DutyResultLine
          value={data.purposesVDP}
          title="Value for duty purposes (VDP):"
        />
        <DutyResultLine
          value={data.estimatedTDE}
          title="Total duty estmated (TDE):"
        />
      </div>
    </div>
  );
}

const DutyResultLine = ({ value, title }: { value: string; title: string }) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <strong>{title}</strong>
      <h6 className="font-heading scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight">
        {value}
      </h6>
    </div>
  );
};
