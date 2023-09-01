import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flattenPostCodes } from "./groups";
import { PostGroup } from "./model";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { getOpenGraphData } from "@/lib/seo";
import { DataTable } from "./data-table";
import { columns } from "./columns";



export default function Page() {
  const data = flattenPostCodes();
  return (
    <div className="container mt-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

const LocationCodes = ({ group }: { group: PostGroup }) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full mb-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-medium text-slate-900 dark:text-slate-200">
              {group.name}
            </h2>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Table>
          <TableCaption className="mb-6">
            All post codes for {group.name}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.codes.map((code) => {
              return (
                <TableRow key={code.code}>
                  <TableCell>{code.name}</TableCell>
                  <TableCell>{code.code}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const metadata: Metadata = {
  title: "Malawi POSTCODES",
  description: "All post codes for malawi",
  openGraph: getOpenGraphData({
    title: "Malawi POSTCODES",
    description: "All post codes for malawi",
  }),
};
