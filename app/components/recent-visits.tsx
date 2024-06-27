import { GetServerSideProps, NextPage } from "next";
import { ChildAttendance } from "@/types/types";
import { VisistsDataTable } from "@/components/ui/custom/visits-data-table";
import { columns } from "./columns";

interface ChildAttendanceProps {
  childAttendanceData: ChildAttendance[];
}

const RecentChildAttendance: NextPage<ChildAttendanceProps> = ({
  childAttendanceData,
}) => {
  console.log("Recent Visits Data in Component:", childAttendanceData); // Log data

  return (
    <div className="w-full">
      <VisistsDataTable data={childAttendanceData} columns={columns} />
    </div>
  );
};

export default RecentChildAttendance;
