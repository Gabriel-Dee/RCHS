// components/ChildFollowUpReport.tsx
"use client";
import React, { useEffect, useState, forwardRef, ReactNode } from 'react';

interface ReportData {
  general_information: {
    health_facility_name: string;
    district: string;
    region: string;
    month: number;
    year: number;
    report_preparer_name: string;
    date: number;
    cadre: string;
    position: string;
    approved_by: string;
    facility_district_region_phone_number: string;
    date_report_received_at_district: string;
  };
  number_of_registered_children: Record<string, Record<string, number>>;
  attendance_and_weight_for_age_height_for_age_ratios_under_1_year: Record<string, Record<string, number>>;
  attendance_and_weight_for_age_height_for_age_ratios_1_to_5_years: Record<string, Record<string, number>>;
  vitamin_a_supplementation_by_age: Record<string, Record<string, number>>;
  deworming_with_mebendazole_albendazole: Record<string, Record<string, number>>;
  feeding_of_infants_born_to_hiv_positive_mothers: Record<string, Record<string, number>>;
  pmtct_information_recipients: Record<string, Record<string, number>>;
}

const MonthlyReport = forwardRef<HTMLDivElement>((props, ref) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    fetch("http://100.42.178.17:8800/api/FollowupQuartely/")
      .then((response) => response.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error("Error fetching report data:", error));
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const { general_information, ...sections } = reportData;

  return (
    <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Child Follow-up Report</h1>
            <h2 className="text-lg">{general_information.health_facility_name}</h2>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold">Prepared by</h3>
            <div className="text-gray-200">{new Date(general_information.date_report_received_at_district).toLocaleDateString()}</div>
          </div>
        </header>

        <Section title="General Information">
          <Table>
            <TableRow label="Health Facility Name" value={general_information.health_facility_name} />
            <TableRow label="District" value={general_information.district} />
            <TableRow label="Region" value={general_information.region} />
            <TableRow label="Month" value={general_information.month.toString()} />
            <TableRow label="Year" value={general_information.year.toString()} />
            <TableRow label="Report Preparer's Name" value={general_information.report_preparer_name} />
            <TableRow label="Date" value={general_information.date.toString()} />
            <TableRow label="Cadre" value={general_information.cadre} />
            <TableRow label="Position" value={general_information.position} />
            <TableRow label="Approved by" value={general_information.approved_by} />
            <TableRow label="Facility/District/Region Phone Number" value={general_information.facility_district_region_phone_number} />
            <TableRow label="Date Report Received at District" value={general_information.date_report_received_at_district} />
          </Table>
        </Section>

        {Object.entries(sections).map(([sectionTitle, sectionData]) => (
          <Section key={sectionTitle} title={sectionTitle.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}>
            <TableWithGender>
              {Object.entries(sectionData).map(([key, data]) => (
                <GenderTableRow key={key} label={key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} data={data} />
              ))}
            </TableWithGender>
          </Section>
        ))}
      </div>
    </div>
  );
});

const Section: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-blue-500 mb-4">{title}</h2>
    {children}
  </div>
);

const Table: React.FC<{ children: ReactNode }> = ({ children }) => (
  <table className="w-full text-left border-collapse mb-4">
    <tbody>{children}</tbody>
  </table>
);

const TableRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}:</td>
    <td className="p-2">{value}</td>
  </tr>
);

const TableWithGender: React.FC<{ children: ReactNode }> = ({ children }) => (
  <table className="w-full text-left border-collapse mb-4">
    <thead>
      <tr className="border-t">
        <th className="p-2">Section</th>
        <th className="p-2">Male</th>
        <th className="p-2">Female</th>
        <th className="p-2">Total</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const GenderTableRow: React.FC<{ label: string; data: Record<string, number> }> = ({ label, data }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}</td>
    <td className="p-2">{data.male}</td>
    <td className="p-2">{data.female}</td>
    <td className="p-2">{data.total}</td>
  </tr>
);

export default MonthlyReport;
