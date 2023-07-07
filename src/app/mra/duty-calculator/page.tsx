import DutyForm from "./form";

export default function Page() {
  return (
    <div className="flex container h-full flex-col items-center justify-center">
      <div className="w-full p-2 border-0 lg:w-1/2 lg:p-8 lg:border">
        <DutyForm />
      </div>
    </div>
  );
}


export const runtime = 'edge'