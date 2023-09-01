"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PostCodeData } from "./model";
import { Badge } from "@/components/ui/badge";
import ClipboardButton from "./clipboard";

export const columns: ColumnDef<PostCodeData>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center">
          <span>{data.code}</span>
          <ClipboardButton text={data.code}/>
        </div>
      );
    },
  },
  {
    accessorKey: "group",
    header: "District",
    cell: ({ row }) => {
      const label = row.original.region;

      return (
        <div className="flex space-x-2 flex-wrap">
          {label && <Badge variant="outline">{label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("group")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "region",
    header: "Region",
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
