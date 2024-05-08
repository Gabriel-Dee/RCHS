"use client"
import React, { useState, useEffect } from "react";

// Define the type for activity data
type ActivityItem = {
  id: number;
  description: string;
  timestamp: string;
};

const ActivityLog: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activityData, setActivityData] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Simulate fetching data from a database
    setTimeout(() => {
      const mockData: ActivityItem[] = [
        {
          id: 1,
          description: "Received Polio Vaccination",
          timestamp: "30 min ago",
        },
        {
          id: 2,
          description: "Came for consultation",
          timestamp: "1 week ago",
        },
        {
          id: 3,
          description: "Clinic Visist",
          timestamp: "2 weeks ago",
        },
        {
          id: 4,
          description: "Emergency Consulation",
          timestamp: "3 weeks ago",
        },
        {
          id: 5,
          description: "Clinic Visist",
          timestamp: "3 weeks ago",
        },
        {
          id: 6,
          description: "Clinic Visit",
          timestamp: "5 weeks ago",
        },
      ];
      setActivityData(mockData);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <h4 className="text-xl text-gray-900 font-bold">Visits Activity Log</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-20 border-[#326164]"></div>

          {/* Render timeline items */}
          {activityData.map((item) => (
            <div key={item.id} className="flex items-center w-full my-6 -ml-1.5">
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
