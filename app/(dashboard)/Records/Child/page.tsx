import { options } from "@/app/api/auth/[...nextauth]/options";
import ChildRecords from "@/app/components/child-records";
import {
  TableCard,
  TableCardContent,
  TableCardDescription,
  TableCardHeader,
  TableCardTitle,
} from "@/components/ui/table-card";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Records() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Records/Child");
  }
  // Fetch Child data here
  const res = await fetch("http://127.0.0.1:8000/api/getChildSummary/", {
    // headers: {
    //   'Authorization': `Bearer ${session.accessToken}`, // If authorization is needed
    // },
  });

  const childAttendanceData = await res.json();
  console.log(childAttendanceData);
  
  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
          <TableCard className="lg:col-span-12 border-2">
            <TableCardHeader>
              <TableCardTitle>Child Records</TableCardTitle>
              <TableCardDescription>
                This is a table containing a List of Children
              </TableCardDescription>
            </TableCardHeader>
            <TableCardContent>
              <ChildRecords childAttendanceData={childAttendanceData} />
            </TableCardContent>
          </TableCard>
        </div>
      </div>
    </>
  );
}
