"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MotherDataTable } from "@/components/ui/custom/mother-records-table";
import { MotherAttendance } from "@/types/types";

// Sample child attendance data (replace with real data)
const motherAttendanceData: MotherAttendance[] = [
  {
    id: "1",
    name: "Mama Sarah",
    age: 31,
    gender: "Female",
    child: "Sarah Johnson",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Michael",
    age: 41,
    gender: "Female",
    child: "Michael Smith",
    lastVisit: "2024-03-30",
  },
  {
    id: "1",
    name: "Mama Tuntufye",
    age: 32,
    gender: "Female",
    child: "Tuntufye Mwakibinga",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Mwakifumbwa",
    age: 42,
    gender: "Female",
    child: "mwakifumbwa Michale",
    lastVisit: "2024-03-30",
  },
  {
    id: "1",
    name: "Mama Nshiminye",
    age: 35,
    gender: "Female",
    child: "Nshiminye Johnson",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Imana",
    age: 40,
    gender: "Female",
    child: "Imana Smith",
    lastVisit: "2024-03-30",
  },
  {
    id: "1",
    name: "Mama Sarah",
    age: 23,
    gender: "Female",
    child: "Sarah Finna",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Mikaeli",
    age: 24,
    gender: "Female",
    child: "Mikaeli Smis",
    lastVisit: "2024-03-30",
  },
  {
    id: "1",
    name: "Mama Sarai",
    age: 28,
    gender: "Female",
    child: "Sarai Lot",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Gabu",
    age: 43,
    gender: "Female",
    child: "Gabu Smith",
    lastVisit: "2024-03-30",
  },
  {
    id: "1",
    name: "Mama Abram",
    age: 33,
    gender: "Female",
    child: "Abram Johnson",
    lastVisit: "2024-03-29",
  },
  {
    id: "2",
    name: "Mama Moses",
    age: 34,
    gender: "Female",
    child: "Moses Smith",
    lastVisit: "2024-03-30",
  },
];

// Define columns for child attendance data table
export const columns: ColumnDef<MotherAttendance>[] = [
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
    accessorKey: "child",
    header: "Child",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit Date",
  },
];

export function MotherRecords() {
  // const [motherAttendanceData, setmotherAttendanceData] = useState<
  //   MotherAttendance[]
  // >([]);

  // useEffect(() => {
  //   // Fetch data from backend API endpoint
  //   fetchChildrenData();
  // }, []);

  // const fetchChildrenData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/children");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setmotherAttendanceData(data);
  //     } else {
  //       throw new Error("Failed to fetch data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // Render the table
  return (
    <div className="w-full">
      <MotherDataTable
        data={motherAttendanceData}
        columns={columns}
      />
    </div>
  );
}
