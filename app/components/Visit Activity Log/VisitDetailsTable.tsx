"use client";
import React, { useState } from "react";
import { ActivityItem } from "@/types/types";
import { Button } from "@/registry/new-york/ui/button";
import EditVisitModal from "../EditChildVisitModal";

interface VisitDetailsTableProps {
  visit: ActivityItem;
  onBack: () => void;
}

const VisitDetailsTable: React.FC<VisitDetailsTableProps> = ({
  visit,
  onBack,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedVisit: ActivityItem) => {
    fetch(`http://rchsbackend:8800/child_visit/${updatedVisit.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVisit),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful update
        setIsEditModalOpen(false);
        onBack(); // Navigate back after saving
      })
      .catch((error) => console.error("Error updating visit data:", error));
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Visit Details
        </h2>
        <div>
          {/* <Button onClick={handleEditClick} className="btn mr-2">
            Edit
          </Button> */}
          <Button onClick={onBack} className="btn">
            Back
          </Button>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        Details of the selected visit.
      </p>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Field
                    </th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {Object.entries(visit).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        {key}
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditVisitModal
          visit={visit}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default VisitDetailsTable;
