import { GetServerSideProps, NextPage } from 'next';
import { ChildAttendance } from '@/types/types';
import { ChildDataTable } from '@/components/ui/custom/child-records-table';
import { columns } from './columns';

interface ChildAttendanceProps {
  childAttendanceData: ChildAttendance[];
}

export const getServerSideProps: GetServerSideProps<ChildAttendanceProps> = async () => {
  const res = await fetch('http://your-django-api-endpoint/child-attendance/');
  const data: ChildAttendance[] = await res.json();

  return {
    props: { childAttendanceData: data },
  };
};

const ChildRecords: NextPage<ChildAttendanceProps> = ({ childAttendanceData }) => {
  return (
    <div className="w-full">
      <ChildDataTable data={childAttendanceData} columns={columns} />
    </div>
  );
};

export default ChildRecords;
