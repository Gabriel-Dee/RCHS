import { NextPage } from "next";
import { MotherAttendance } from "@/types/types";
import { MotherDataTable } from "@/components/ui/custom/mother-records-table";
import { mothercolumns } from "./columns";

interface MotherAttendanceProps {
  motherAttendanceData: MotherAttendance[];
}

const MotherRecords: NextPage<MotherAttendanceProps> = ({
  motherAttendanceData,
}) => {
  console.log("Mother Attendance Data in Component:", motherAttendanceData); // Log data

  return (
    <div className="w-full">
      <MotherDataTable data={motherAttendanceData} columns={mothercolumns} />
    </div>
  );
};

export default MotherRecords;
