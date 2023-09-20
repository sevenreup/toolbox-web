"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SelectFormField, TextFormField } from "@/components/form";
import { supportedCurrency, supportedEngineCapacity } from "@/config/data";
import { fetchDuty } from "./fetch";
import { useState } from "react";
import { DutyCalculationData } from "@/lib/types";
import DutyResults from "@/components/duty";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type IDutyForm = z.infer<typeof formSchema>;

const formSchema = z.object({
  currency: z.string().nonempty({
    message: "Please select a currency.",
  }),
  cif: z.coerce.number().nonnegative({
    message: "Please enter a valid CIF.",
  }),
  portCharge: z.coerce.number().nonnegative({
    message: "Please enter a valid Port Change.",
  }),
  age: z.coerce
    .number({
      required_error: "Please enter a valid year.",
      invalid_type_error: "Please enter a valid year.",
    })
    .refine(
      (year) => {
        return Number.isInteger(year) && year >= 1000 && year <= 9999;
      },
      {
        message:
          "Invalid year. Please enter a 4-digit year between 1000 and 9999 as a number.",
      }
    ),
  engineCapacity: z.string().nonempty({
    message: "Please select a engine capacity.",
  }),
});

export default function DutyForm() {
  const [dutyData, setDutyData] = useState<DutyCalculationData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [hasError, sethasError] = useState(false);

  const form = useForm<IDutyForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "",
      cif: 0,
      portCharge: 0,
      age: undefined,
      engineCapacity: "",
    },
  });

  async function onSubmit(values: IDutyForm) {
    try {
      setLoading(true);
      sethasError(false);
      const data = await fetchDuty(values);

      if (data !== undefined) {
        setDutyData(data);
      } else {
        setDutyData(undefined);
        sethasError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      sethasError(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {dutyData && <DutyResults data={dutyData} />}
        {hasError && <AlertDestructive />}
        <SelectFormField
          control={form.control}
          name="currency"
          label="Select Currency:"
          placeholder="Select Currency"
          list={supportedCurrency}
          displayKey="name"
          valueKey="code"
        />
        <TextFormField
          control={form.control}
          name="cif"
          label="Cost, Insurance & Freight (CIF):"
          type="number"
        />
        <TextFormField
          control={form.control}
          name="portCharge"
          label="Port charge:"
          type="number"
        />
        <TextFormField
          control={form.control}
          name="age"
          label="Year of Make:"
          type="number"
        />
        <SelectFormField
          control={form.control}
          name="engineCapacity"
          label="Select Engine Capacity:"
          placeholder="Select Engine Capacity"
          list={supportedEngineCapacity}
          displayKey="name"
          valueKey="code"
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loading />}Calculate
        </Button>
      </form>
    </Form>
  );
}

function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong, please try again later.
      </AlertDescription>
    </Alert>
  );
}

const Loading = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
