import { ChildAttendance, MotherAttendance } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

// Define columns for child attendance data table
export const columns: ColumnDef<ChildAttendance>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "weight",
      header: "Weight (kg)",
    },
    {
      accessorKey: "height",
      header: "Height (cm)",
    },
    {
      accessorKey: "lastVisit",
      header: "Last Visit Date",
    },
  ];

  // Define columns for child attendance data table
export const mothercolumns: ColumnDef<MotherAttendance>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "child",
    header: "Child",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit Date",
  },
];