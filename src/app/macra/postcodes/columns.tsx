"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PostCodeData } from "./model";

export const columns: ColumnDef<PostCodeData>[] = [
  {
    accessorKey: "group",
    header: "District",
  },
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "region",
    header: "Region",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
