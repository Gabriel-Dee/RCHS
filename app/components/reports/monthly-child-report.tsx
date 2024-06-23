// components/AnnualReport.tsx
"use client";
import React, { forwardRef, ReactNode } from 'react';

const MonthlyReport = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Annual Report</h1>
          <h2 className="text-lg">Clinic Name</h2>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">Prepared by</h3>
          <div className="text-gray-200">Date</div>
        </div>
      </header>

      <Section title="Yearly Summary">
        <Table>
          <TableRow label="Total Patients Seen" value="____" />
          <TableRow label="Age Distribution" value="____" />
          <TableRow label="Gender Distribution" value="____" />
        </Table>
      </Section>

      <Section title="Trend Analysis">
        <Table>
          <TableRow label="Comparison with Previous Years" value="____" />
          <TableRow label="Under-five Mortality Rate" value="____" />
          <TableRow label="Common Diseases Trends" value="____" />
        </Table>
      </Section>

      <Section title="Program Evaluations">
        <Table>
          <TableRow label="Immunization Program" value="____" />
          <TableRow label="Coverage Rate" value="____" />
          <TableRow label="Challenges" value="____" />
        </Table>
        <Table>
          <TableRow label="Growth Monitoring" value="____" />
          <TableRow label="Average Annual Growth" value="____" />
          <TableRow label="Malnutrition Cases" value="____" />
        </Table>
      </Section>

      <Section title="Strategic Planning">
        <Table>
          <TableRow label="Achievements" value="____" />
          <TableRow label="Key Challenges" value="____" />
          <TableRow label="Recommendations for Future Improvements" value="____" />
          <TableRow label="Resource Needs" value="____" />
          <TableRow label="Training Needs" value="____" />
        </Table>
      </Section>

      <Section title="Financial Overview">
        <Table>
          <TableRow label="Budget Utilization" value="____" />
          <TableRow label="Funding Sources" value="____" />
        </Table>
      </Section>

      <Section title="Appendices">
        <Table>
          <TableRow label="Detailed Monthly and Quarterly Reports" value="____" />
          <TableRow label="Graphs and Charts for Visual Data Representation" value="____" />
        </Table>
      </Section>
    </div>
  </div>
));

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

export default MonthlyReport;
