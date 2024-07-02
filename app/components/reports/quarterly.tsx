// components/AnnualReport.tsx
"use client";
import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

const AnnualReport = forwardRef<HTMLDivElement>((props, ref) => {
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/ReportQuartely/');
      const data = await response.json();
      setReportData(data);
    };

    fetchData();
  }, []);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Quarterly Postnatal Care Report</h1>
            <h2 className="text-lg">{reportData.health_facility_name}</h2>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold">Prepared by</h3>
            <div className="text-gray-200">{reportData.date_prepared}</div>
          </div>
        </header>

        <Section title="General Information">
          <Table>
            <TableRow label="Report Month" value={reportData.report_month} />
            <TableRow label="Report Year" value={reportData.report_year} />
            <TableRow label="Health Facility Name" value={reportData.health_facility_name} />
            <TableRow label="District" value={reportData.district} />
            <TableRow label="Report Preparer's Name" value={reportData.report_preparer_name} />
            <TableRow label="Approved by" value={reportData.approved_by} />
            <TableRow label="Position" value={reportData.position} />
            <TableRow label="Health Facility Phone Number" value={reportData.health_facility_phone_number} />
            <TableRow label="Designation" value={reportData.designation} />
            <TableRow label="Date Prepared" value={reportData.date_prepared} />
            <TableRow label="Date Received at District" value={reportData.date_received_at_district} />
          </Table>
        </Section>

        <Section title="Section 1: Client Visits">
          <TableWithAgeGroups>
            {Object.entries(reportData.section_1).map(([key, values]) => (
              <AgeGroupTableRow key={key} label={key} values={values} />
            ))}
          </TableWithAgeGroups>
        </Section>

        <Section title="Section 2: Delivered Outside Health Facilities">
          <TableWithAgeGroups>
            {Object.entries(reportData.section_2).map(([key, values]) => (
              <AgeGroupTableRow key={key} label={key} values={values} />
            ))}
          </TableWithAgeGroups>
        </Section>

        <Section title="Section 3: Family Planning">
          <TableWithAgeGroups>
            {Object.entries(reportData.section_3).map(([key, values]) => (
              <AgeGroupTableRow key={key} label={key} values={values} />
            ))}
          </TableWithAgeGroups>
        </Section>

        <Section title="Section 4: PMTCT">
          <TableWithAgeGroups>
            {Object.entries(reportData.section_4).map(([key, values]) => (
              <AgeGroupTableRow key={key} label={key} values={values} />
            ))}
          </TableWithAgeGroups>
        </Section>

        <Section title="Section 5: Child Visits">
          <TableWithGender>
            {Object.entries(reportData.section_5).map(([key, values]) => (
              <GenderTableRow key={key} label={key} values={values} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Section 6: Child Services/Tests">
          <TableWithGender>
            {Object.entries(reportData.section_6).map(([key, values]) => (
              <GenderTableRow key={key} label={key} values={values} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Section 7: Child Infections">
          <TableWithGender>
            {Object.entries(reportData.section_7).map(([key, values]) => (
              <GenderTableRow key={key} label={key} values={values} />
            ))}
          </TableWithGender>
        </Section>

        <Section title="Section 8: Child Feeding">
          <TableWithGender>
            {Object.entries(reportData.section_8).map(([key, values]) => (
              <GenderTableRow key={key} label={key} values={values} />
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

const TableRow: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}:</td>
    <td className="p-2">{value}</td>
  </tr>
);

const TableWithAgeGroups: React.FC<{ children: ReactNode }> = ({ children }) => (
  <table className="w-full text-left border-collapse mb-4">
    <thead>
      <tr>
        <th className="p-2">Section</th>
        <th className="p-2">10-14</th>
        <th className="p-2">15-19</th>
        <th className="p-2">20-24</th>
        <th className="p-2">25-29</th>
        <th className="p-2">30-34</th>
        <th className="p-2">35+</th>
        <th className="p-2">All Ages</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const AgeGroupTableRow: React.FC<{ label: string; values: any }> = ({ label, values }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label.replace(/_/g, ' ')}:</td>
    <td className="p-2">{values["10_14"]}</td>
    <td className="p-2">{values["15_19"]}</td>
    <td className="p-2">{values["20_24"]}</td>
    <td className="p-2">{values["25_29"]}</td>
    <td className="p-2">{values["30_34"]}</td>
    <td className="p-2">{values["35_plus"]}</td>
    <td className="p-2">{values["all_ages"]}</td>
  </tr>
);

const TableWithGender: React.FC<{ children: ReactNode }> = ({ children }) => (
  <table className="w-full text-left border-collapse mb-4">
    <thead>
      <tr>
        <th className="p-2">Section</th>
        <th className="p-2">Male</th>
        <th className="p-2">Female</th>
        <th className="p-2">Total</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const GenderTableRow: React.FC<{ label: string; values: any }> = ({ label, values }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label.replace(/_/g, ' ')}:</td>
    <td className="p-2">{values.male}</td>
    <td className="p-2">{values.female}</td>
    <td className="p-2">{values.total}</td>
  </tr>
);

export default AnnualReport;
