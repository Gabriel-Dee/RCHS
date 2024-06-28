"use client";
import { Button } from "@/registry/new-york/ui/button";
import { ParentActivityItem } from "@/types/types";
import React from "react";

interface VisitDetailsTableProps {
  visit: ParentActivityItem;
  onBack: () => void;
}

const VisitDetailsTable: React.FC<VisitDetailsTableProps> = ({
  visit,
  onBack,
}) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 border border-rchs">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Visit Details
        </h2>
        <Button onClick={onBack} className="btn">
          Back
        </Button>
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
    </div>
  );
};

export default VisitDetailsTable;
