import { NextPage } from "next";
import { ChildAttendance } from "@/types/types";
import { ChildDataTable } from "@/components/ui/custom/child-records-table";
import { columns } from "./columns";

interface ChildAttendanceProps {
  childAttendanceData: ChildAttendance[];
}

const ChildRecords: NextPage<ChildAttendanceProps> = ({
  childAttendanceData,
}) => {
  console.log("Child Attendance Data in Component:", childAttendanceData); // Log data

  return (
    <div className="w-full">
      <ChildDataTable data={childAttendanceData} columns={columns} />
    </div>
  );
};

export default ChildRecords;
