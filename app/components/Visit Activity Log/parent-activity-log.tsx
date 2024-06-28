"use client";
import React, { useState } from "react";
import VisitDetailsTable from "./ParentVisitDetailsTable";
import { ParentActivityItem } from "@/types/types";


interface ActivityLogProps {
  activityData: ParentActivityItem[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activityData = [] }) => {
  // Ensure activityData is an array
  if (!Array.isArray(activityData)) {
    console.error("activityData is not an array", activityData);
    return <p>Invalid activity data</p>;
  }

  const [selectedVisit, setSelectedVisit] = useState<ParentActivityItem | null>(null);

  const handleVisitClick = (item: ParentActivityItem) => {
    setSelectedVisit(item);
  };

  if (selectedVisit) {
    return <VisitDetailsTable visit={selectedVisit} onBack={() => setSelectedVisit(null)} />;
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <h4 className="text-xl text-gray-900 font-bold">Visits Activity Log</h4>
      {activityData.length === 0 ? (
        <p>No activity data available</p>
      ) : (
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-20 border-[#326164]"></div>

          {activityData.map((item) => (
            <div
              key={item.id}
              className="flex items-center w-full my-6 -ml-1.5"
              onClick={() => handleVisitClick(item)}
            >
              <div className="w-1/12 z-10">
                <div className="w-3.5 h-3.5 bg-rchs rounded-full"></div>
              </div>
              <div className="w-11/12">
                <p className="text-sm">{item.description}</p>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
