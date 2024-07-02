"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import PersonalInfo from "@/app/components/mother-personal-info";
import ActivityLog from "@/app/components/Visit Activity Log/parent-activity-log";
import { ParentActivityItem } from "@/types/types";
import EditMotherModal from "@/app/components/EditParentModal";

const Profile: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedMotherData, setSelectedMotherData] = useState<any | null>(
    null
  );
  const [selectedActivityData, setSelectedActivityData] = useState<
    ParentActivityItem[]
  >([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/mother/${id}/`)
        .then((res) => res.json())
        .then((data) => setSelectedMotherData(data))
        .catch((error) => console.error("Error fetching mother data:", error));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/mother_visit/`)
        .then((response) => response.json())
        .then((data) => {
          const filteredVisits = data.filter((visit: any) =>
            visit.mother.includes(`/mother/${id}/`)
          );
          const formattedActivityData: ParentActivityItem[] =
            filteredVisits.map((visit: any) => ({
              id: visit.id,
              description: `Visit Number ${visit.visit_number}`,
              timestamp: visit.visit_date
                ? new Date(visit.visit_date).toLocaleDateString()
                : "No Date",
              mother_name: visit.mother_name,
              visit_number: visit.visit_number,
              visit_date: visit.visit_date,
              body_temperature: visit.body_temperature,
              blood_pressure: visit.blood_pressure,
              hb_percentage: visit.hb_percentage,
              pmtct_nutrition: visit.pmtct_nutrition,
              breastfeeding: visit.breastfeeding,
              milk_coming_out: visit.milk_coming_out,
              breastfeeding_within_hour: visit.breastfeeding_within_hour,
              sore_nipples: visit.sore_nipples,
              full_nipples: visit.full_nipples,
              abscesses: visit.abscesses,
              breastfeeding_advice: visit.breastfeeding_advice,
              uterus_shrinking: visit.uterus_shrinking,
              uterus_pain: visit.uterus_pain,
              incision_type: visit.incision_type,
              wound_healed: visit.wound_healed,
              pus: visit.pus,
              wound_open: visit.wound_open,
              bad_smell: visit.bad_smell,
              lochia_amount: visit.lochia_amount,
              lochia_color: visit.lochia_color,
              mental_state: visit.mental_state,
              mental_issues: visit.mental_issues,
              advice_given: visit.advice_given,
              ferrous_sulphate: visit.ferrous_sulphate,
              folic_acid: visit.folic_acid,
              tetanus_toxoid_doses: visit.tetanus_toxoid_doses,
              pmtct_ctx: visit.pmtct_ctx,
              postpartum_medications: visit.postpartum_medications,
              vitamin_a: visit.vitamin_a,
              date_of_next_visit: visit.date_of_next_visit,
              provider_name: visit.provider_name,
              provider_title: visit.provider_title,
            }));
          setSelectedActivityData(formattedActivityData);
        })
        .catch((error) =>
          console.error("Error fetching activity data:", error)
        );
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedData: any) => { // Adjust this type according to your API response structure
    fetch(`http://127.0.0.1:8000/mother/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedMotherData(data);
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating mother data:", error));
  };

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
            <Link href={"/Visits/ParentVisits"}>
              <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <span>New Visit</span>
              </Button>
            </Link>
            <Button
              onClick={handleEditClick}
              className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
            >
              <span>Edit Patient</span>
            </Button>
          </div>
        </div>
      </div>
      <PersonalInfo motherData={selectedMotherData} />
      <ActivityLog activityData={selectedActivityData} />
      <EditMotherModal
        motherData={selectedMotherData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Profile;
