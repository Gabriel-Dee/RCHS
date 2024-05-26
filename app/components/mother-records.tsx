import { GetServerSideProps, NextPage } from 'next';
import { MotherAttendance } from '@/types/types';
import { MotherDataTable } from '@/components/ui/custom/mother-records-table';
import { mothercolumns } from './columns';

interface MotherAttendanceProps {
  motherAttendanceData: MotherAttendance[];
}

export const getServerSideProps: GetServerSideProps<MotherAttendanceProps> = async () => {
  const res = await fetch('http://your-django-api-endpoint/mother-attendance/');
  const data: MotherAttendance[] = await res.json();

  return {
    props: { motherAttendanceData: data },
  };
};

const MotherRecords: NextPage<MotherAttendanceProps> = ({ motherAttendanceData }) => {
  return (
    <div className="w-full">
      <MotherDataTable data={motherAttendanceData} columns={mothercolumns} />
    </div>
  );
};

export default MotherRecords;
