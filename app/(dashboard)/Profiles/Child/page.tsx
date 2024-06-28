"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import PersonalInfo from "@/app/components/child-personal-info";
import NavigationMenu from "@/app/components/graphs/graph-tabs";
import ActivityLog from "@/app/components/Visit Activity Log/child-activity-log";
import { ActivityItem, CardItem, ChildData } from "@/types/types";
import EditChildModal from "@/app/components/EditChildModal";

const Profile: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedChildData, setSelectedChildData] = useState<ChildData | null>(null);
  const [selectedActivityData, setSelectedActivityData] = useState<ActivityItem[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<CardItem[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/child/${id}/`)
        .then((res) => res.json())
        .then((data) => setSelectedChildData(data))
        .catch((error) => console.error("Error fetching child data:", error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/child_visit/`)
        .then((response) => response.json())
        .then((data) => {
          const filteredVisits = data.filter((visit: any) =>
            visit.child.includes(`/child/${id}/`)
          );
          const formattedActivityData: ActivityItem[] = filteredVisits.map((visit: any) => ({
            id: visit.id,
            description: `Visit Number ${visit.visit_number}`,
            timestamp: visit.date ? new Date(visit.date).toLocaleDateString() : "No Date",
            // Other fields
          }));
          setSelectedActivityData(formattedActivityData);
        })
        .catch((error) => console.error("Error fetching activity data:", error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/child_visit/`)
        .then((response) => response.json())
        .then((data) => {
          const filteredVisits = data.filter((visit: any) =>
            visit.child.includes(`/child/${id}/`)
          );
          const formattedCardData: CardItem[] = filteredVisits.map((visit: any) => ({
            id: visit.id,
            weight_grams: visit.weight_grams,
            height: visit.height,
          }));
          setSelectedCardData(formattedCardData);
        })
        .catch((error) => console.error("Error fetching card data:", error));
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedData: ChildData) => {
    fetch(`http://127.0.0.1:8000/child/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedChildData(data);
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating child data:", error));
  };

  if (!selectedChildData) {
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
            {selectedChildData && (
              <p className="text-2xl">{selectedChildData.child_name}</p>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <Link href={"/Visits/ChildVisits"}>
              <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <span>New Visit</span>
              </Button>
            </Link>
            <Button onClick={handleEditClick} className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>Edit Patient</span>
            </Button>
          </div>
        </div>
      </div>
      <PersonalInfo childData={selectedChildData} />
      <ActivityLog activityData={selectedActivityData} />
      <NavigationMenu cardData={selectedCardData} />
      <EditChildModal
        childData={selectedChildData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Profile;
