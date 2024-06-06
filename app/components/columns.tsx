import { ChildAttendance, MotherAttendance } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

// Define columns for child attendance data table
export const columns: ColumnDef<ChildAttendance>[] = [
  {
    accessorKey: "child_name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "child_gender",
    header: "Gender",
  },
  {
    accessorKey: "weight_grams",
    header: "Weight (kg)",
  },
  {
    accessorKey: "height",
    header: "Height (cm)",
  },
  {
    accessorKey: "date",
    header: "Last Visit Date",
  },
];

// Define columns for child attendance data table
export const mothercolumns: ColumnDef<MotherAttendance>[] = [
  {
    accessorKey: "mother_name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "partner_name",
    header: "Partner",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit Date",
  },
];
