// components/ChildFollowUpReport.tsx
"use client";
import React, { useEffect, useState, forwardRef, ReactNode } from 'react';

interface ReportData {
  "General Information": {
    "Health Facility Name": string;
    "District": string;
    "Region": string;
    "Month": number;
    "Year": number;
    "Report Preparer's Name": string;
    "Date": number;
    "Cadre": string;
    "Position": string;
    "Approved by": string;
    "Facility/District/Region Phone Number": string;
    "Date Report Received at District": string;
  };
  "Number of Registered Children": Record<string, Record<string, number>>;
  "Attendance and Weight-for-Age/Height-for-Age Ratios (Under 1 Year)": Record<string, Record<string, number>>;
  "Attendance and Weight-for-Age/Height-for-Age Ratios (1 to 5 Years)": Record<string, Record<string, number>>;
  "Vitamin A Supplementation by Age": Record<string, Record<string, number>>;
  "Deworming with Mebendazole/Albendazole": Record<string, Record<string, number>>;
  "Feeding of Infants Born to HIV Positive Mothers": Record<string, Record<string, number>>;
  "PMTCT Information/Recipients": Record<string, Record<string, number>>;
}

const ChildFollowUpReport = forwardRef<HTMLDivElement>((props, ref) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/FollowupAnnualy/")
      .then((response) => response.json())
      .then((data) => setReportData(data))
      .catch((error) => console.error("Error fetching report data:", error));
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Annual Child Follow-up Report</h1>
            <h2 className="text-lg">Clinic Name</h2>
            {/* <h2 className="text-lg">{reportData.health_facility_name}</h2> */}
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold">Prepared by</h3>
            <div className="text-gray-200">{reportData["General Information"]["Date"]}</div>
          </div>
        </header>

        <Section title="General Information">
          <Table>
            {Object.entries(reportData["General Information"]).map(([key, value]) => (
              <TableRow key={key} label={key} value={value.toString()} />
            ))}
          </Table>
        </Section>

        <Section title="Number of Registered Children">
          <TableWithGender>
            {Object.entries(reportData["Number of Registered Children"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Attendance and Weight-for-Age/Height-for-Age Ratios (Under 1 Year)">
          <TableWithGender>
            {Object.entries(reportData["Attendance and Weight-for-Age/Height-for-Age Ratios (Under 1 Year)"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Attendance and Weight-for-Age/Height-for-Age Ratios (1 to 5 Years)">
          <TableWithGender>
            {Object.entries(reportData["Attendance and Weight-for-Age/Height-for-Age Ratios (1 to 5 Years)"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Vitamin A Supplementation by Age">
          <TableWithGender>
            {Object.entries(reportData["Vitamin A Supplementation by Age"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Deworming with Mebendazole/Albendazole">
          <TableWithGender>
            {Object.entries(reportData["Deworming with Mebendazole/Albendazole"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Feeding of Infants Born to HIV Positive Mothers">
          <TableWithGender>
            {Object.entries(reportData["Feeding of Infants Born to HIV Positive Mothers"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="PMTCT Information/Recipients">
          <TableWithGender>
            {Object.entries(reportData["PMTCT Information/Recipients"]).map(([key, value]) => (
              <GenderTableRow key={key} label={key} data={value} />
            ))}
          </TableWithGender>
        </Section>
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
    <td className="p-2 font-semibold">{label.replace(/_/g, " ")}:</td>
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
    <td className="p-2">{data.Male}</td>
    <td className="p-2">{data.Female}</td>
    <td className="p-2">{data.Total}</td>
  </tr>
);

export default ChildFollowUpReport;
