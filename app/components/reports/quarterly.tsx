// components/QuarterlyReport.tsx
"use client";
import React, { forwardRef, ReactNode } from 'react';

const QuarterlyReport = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Quarterly Report</h1>
          <h2 className="text-lg">Clinic Name</h2>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">Prepared by</h3>
          <div className="text-gray-200">Date</div>
        </div>
      </header>

      <Section title="Aggregated Monthly Data">
        <Table>
          <TableRow label="Total Patients Seen" value="____" />
          <TableRow label="Age Distribution" value="____" />
          <TableRow label="Gender Distribution" value="____" />
        </Table>
      </Section>

      <Section title="Performance Metrics">
        <Table>
          <TableRow label="Immunization Coverage Rate" value="____" />
          <TableRow label="Growth Monitoring Coverage" value="____" />
        </Table>
      </Section>

      <Section title="Resource Utilization">
        <Table>
          <TableRow label="Medical Supplies Used" value="____" />
          <TableRow label="Staff Hours" value="____" />
        </Table>
      </Section>

      <Section title="Health Outcomes">
        <Table>
          <TableRow label="Trend Analysis of Health Indicators" value="____" />
        </Table>
      </Section>

      <Section title="Challenges and Recommendations">
        <Table>
          <TableRow label="Key Challenges" value="____" />
          <TableRow label="Recommendations for Improvement" value="____" />
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

export default QuarterlyReport;
