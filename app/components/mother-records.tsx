import { GetServerSideProps, NextPage } from "next";
import { MotherAttendance } from "@/types/types";
import { MotherDataTable } from "@/components/ui/custom/mother-records-table";
import { mothercolumns } from "./columns";

interface MotherAttendanceProps {
  motherAttendanceData: MotherAttendance[];
}

// export const getServerSideProps: GetServerSideProps<MotherAttendanceProps> = async () => {
//   try {
//     const res = await fetch('http://127.0.0.1:8000/mother/');
//     const data: ChildAttendance[] = await res.json();
//     console.log("Fetched data:", data); // Log fetched data
//     return {
//       props: { motherAttendanceData: data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log errors
//     return {
//       props: { motherAttendanceData: [] },
//     };
//   }
// };

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
