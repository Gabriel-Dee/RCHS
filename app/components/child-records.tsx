import { GetServerSideProps, NextPage } from "next";
import { ChildAttendance } from "@/types/types";
import { ChildDataTable } from "@/components/ui/custom/child-records-table";
import { columns } from "./columns";

interface ChildAttendanceProps {
  childAttendanceData: ChildAttendance[];
}

// export const getServerSideProps: GetServerSideProps<ChildAttendanceProps> = async () => {
//   try {
//     const res = await fetch('http://127.0.0.1:8000/child/');
//     const data: ChildAttendance[] = await res.json();
//     console.log("Fetched data:", data); // Log fetched data
//     return {
//       props: { childAttendanceData: data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log errors
//     return {
//       props: { childAttendanceData: [] },
//     };
//   }
// };

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
