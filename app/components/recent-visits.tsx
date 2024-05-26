import { GetServerSideProps, NextPage } from 'next';
import { ChildAttendance } from '@/types/types';
import { VisistsDataTable } from '@/components/ui/custom/visits-data-table';
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

const RecentChildAttendance: NextPage<ChildAttendanceProps> = ({ childAttendanceData }) => {
  return (
    <div className="w-full">
      <VisistsDataTable data={childAttendanceData} columns={columns} />
    </div>
  );
};

export default RecentChildAttendance;
