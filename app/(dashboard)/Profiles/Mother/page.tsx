"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ActivityLog from "@/app/components/patient-activity-log";
import PersonalInfo from "@/app/components/mother-personal-info";

type ActivityItem = {
  id: number;
  description: string;
  timestamp: string;
};

const Profile: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedMotherData, setSelectedMotherData] = useState<any | null>(null);
  const [selectedActivityData, setSelectedActivityData] = useState<ActivityItem[]>([]);

  console.log("This is the id", id);
  console.log("Selected Mother Data:", selectedMotherData);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/mother/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Mother data fetched:", data);
          setSelectedMotherData(data);
        })
        .catch((error) => console.error("Error fetching mother data:", error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/mother_visit/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData: ActivityItem[] = [{
            id: data.id,
            description: `Visit Number ${data.visit_number}: ${data.breastfeeding_advice}`,
            timestamp: new Date(data.visit_date).toLocaleDateString(),
          }];
          setSelectedActivityData(formattedData);
        })
        .catch((error) =>
          console.error("Error fetching activity data:", error)
        );
    }
  }, [id]);

  if (!selectedMotherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl pb-8 border border-rchsLight">
        <div className="w-full h-[200px] bg-rchs rounded-lg"></div>
        <div className="flex flex-col items-center -mt-20">
          <Image
            src="/avatar/me.png"
            className="w-40 border-4 border-white rounded-full"
            alt="Profile Image"
            width={200}
            height={200}
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{selectedMotherData.mother_name}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <Link href={"/Visits"}>
              <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <span>New Visit</span>
              </Button>
            </Link>
            <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>Generate Report</span>
            </Button>
          </div>
        </div>
      </div>
      <PersonalInfo motherData={selectedMotherData} />
      <ActivityLog activityData={selectedActivityData} />
    </>
  );
};

export default Profile;
