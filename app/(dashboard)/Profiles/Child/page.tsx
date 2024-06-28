"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PersonalInfo from "@/app/components/child-personal-info";
import NavigationMenu from "@/app/components/graphs/graph-tabs";
import ActivityLog from "@/app/components/Visit Activity Log/child-activity-log";
import { ActivityItem, CardItem } from "@/types/types";

const Profile: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedChildData, setSelectedChildData] = useState<any | null>(null);
  const [selectedActivityData, setSelectedActivityData] = useState<
    ActivityItem[]
  >([]);
  const [selectedCardData, setSelectedCardData] = useState<CardItem[]>([]);

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
          console.log("Fetched activity data:", data);
          const filteredVisits = data.filter((visit: any) =>
            visit.child.includes(`/child/${id}/`)
          );
          const formattedActivityData: ActivityItem[] = filteredVisits.map(
            (visit: any) => ({
              id: visit.id,
              description: `Visit Number ${visit.visit_number}`,
              timestamp: visit.date
                ? new Date(visit.date).toLocaleDateString()
                : "No Date",
              child_name: visit.child_name,
              visit_number: visit.visit_number,
              visit_phase: visit.visit_phase,
              date: visit.date,
              return_date: visit.return_date,
              vitamin_a: visit.vitamin_a,
              deworming_medication: visit.deworming_medication,
              weight_grams: visit.weight_grams,
              height: visit.height,
              anemia: visit.anemia,
              body_temperature: visit.body_temperature,
              infant_nutrition: visit.infant_nutrition,
              unable_to_breastfeed: visit.unable_to_breastfeed,
              child_play: visit.child_play,
              eyes: visit.eyes,
              mouth: visit.mouth,
              ears: visit.ears,
              navel_healed: visit.navel_healed,
              navel_red: visit.navel_red,
              navel_discharge_odor: visit.navel_discharge_odor,
              has_pus_filled_bumps: visit.has_pus_filled_bumps,
              has_turned_yellow: visit.has_turned_yellow,
              received_bcg: visit.received_bcg,
              received_polio_0: visit.received_polio_0,
              received_polio_1: visit.received_polio_1,
              received_dtp_hep_hib: visit.received_dtp_hep_hib,
              received_pneumococcal: visit.received_pneumococcal,
              received_rota: visit.received_rota,
              name_of_attendant: visit.name_of_attendant,
              attendant_title: visit.attendant_title,
              hb_percentage: visit.hb_percentage,
              bmi: visit.bmi,
            })
          );
          setSelectedActivityData(formattedActivityData);
        })
        .catch((error) =>
          console.error("Error fetching activity data:", error)
        );
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
          const formattedCardData: CardItem[] = filteredVisits.map(
            (visit: any) => ({
              id: visit.id,
              weight_grams: visit.weight_grams,
              height: visit.height,
            })
          );
          setSelectedCardData(formattedCardData);
        })
        .catch((error) => console.error("Error fetching card data:", error));
    }
  }, [id]);

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
            <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>New Appointment</span>
            </Button>
            <Button className="flex items-center bg-rchs hover:bg-rchsLight text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <span>Generate Report</span>
            </Button>
          </div>
        </div>
      </div>
      <PersonalInfo childData={selectedChildData} />
      <ActivityLog activityData={selectedActivityData} />
      <NavigationMenu cardData={selectedCardData} />
    </>
  );
};

export default Profile;
