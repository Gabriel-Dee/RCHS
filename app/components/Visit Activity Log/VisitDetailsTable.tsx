import React from 'react';

interface VisitDetailsTableProps {
  visit: {
    id: number;
    child_name: string;
    visit_number: string;
    visit_phase: string;
    date: string;
    return_date: string;
    vitamin_a: string;
    deworming_medication: string;
    weight_grams: number;
    height: number;
    anemia: string;
    body_temperature: number;
    infant_nutrition: string;
    unable_to_breastfeed: string;
    child_play: string;
    eyes: string;
    mouth: string;
    ears: string;
    navel_healed: string;
    navel_red: string;
    navel_discharge_odor: string;
    has_pus_filled_bumps: string;
    has_turned_yellow: string;
    received_bcg: string;
    received_polio_0: string;
    received_polio_1: string;
    received_dtp_hep_hib: string;
    received_pneumococcal: string;
    received_rota: string;
    name_of_attendant: string;
    attendant_title: string;
    hb_percentage: number;
    bmi: number;
  };
  onBack: () => void;
}

const VisitDetailsTable: React.FC<VisitDetailsTableProps> = ({ visit, onBack }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onBack}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 max-w-4xl w-full mx-auto overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Visit Details</h2>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400" onClick={onBack}>
            &times;
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Details of the selected visit.</p>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Field</th>
                      <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {Object.entries(visit).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{key}</td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitDetailsTable;
