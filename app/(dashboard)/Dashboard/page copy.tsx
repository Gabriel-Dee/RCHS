import { options } from "@/app/api/auth/[...nextauth]/options";
import DashboardCard from "@/app/components/DashboardCard";
import RecentChildAttendance from "@/app/components/recent-visits";
import {
  TableCard,
  TableCardContent,
  TableCardDescription,
  TableCardHeader,
  TableCardTitle,
} from "@/components/ui/table-card";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface DashboardSummary {
  totalChildren: {
    count: number;
    percentageChange: string;
  };
  totalMale: {
    count: number;
    percentageChange: string;
  };
  totalFemale: {
    count: number;
    percentageChange: string;
  };
  averageAge: {
    value: number;
    percentageChange: string;
  };
}

export default async function Dashboard() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Dashboard");
  }

  const res = await fetch('http://your-api-endpoint/api/dashboard-summary');
  const data: DashboardSummary = await res.json();

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Dashboard</h2>

      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Children"
            value={data.totalChildren.count.toString()}
            percentageChange={data.totalChildren.percentageChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-black"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <DashboardCard
            title="Total Male"
            value={data.totalMale.count.toString()}
            percentageChange={data.totalMale.percentageChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-black"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <DashboardCard
            title="Total Female"
            value={data.totalFemale.count.toString()}
            percentageChange={data.totalFemale.percentageChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-black"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            }
          />
          <DashboardCard
            title="Average Age"
            value={data.averageAge.value.toString()}
            percentageChange={data.averageAge.percentageChange}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-black"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
          <TableCard className="lg:col-span-12 border-2">
            <TableCardHeader>
              <TableCardTitle>Recent Patients</TableCardTitle>
              <TableCardDescription>256 Patients Attended this month</TableCardDescription>
            </TableCardHeader>
            <TableCardContent>
              <RecentChildAttendance childAttendanceData={[]} />
            </TableCardContent>
          </TableCard>
        </div>
      </div>
    </>
  );
}

