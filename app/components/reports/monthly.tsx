// components/MonthlyReport.tsx
"use client";
import React, { forwardRef, ReactNode } from 'react';

const MonthlyReport = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Monthly Report</h1>
          <h2 className="text-lg">Clinic Name</h2>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">Prepared by</h3>
          <div className="text-gray-200">Date</div>
        </div>
      </header>

      <Section title="Patient Demographics">
        <Table>
          <TableRow label="Total Patients Seen" value="____" />
          <TableRow label="0-1 years" value="____" />
          <TableRow label="1-2 years" value="____" />
          <TableRow label="2-3 years" value="____" />
          <TableRow label="3-4 years" value="____" />
          <TableRow label="4-5 years" value="____" />
          <TableRow label="Male" value="____" />
          <TableRow label="Female" value="____" />
        </Table>
      </Section>

      <Section title="Health Indicators">
        <Table>
          <TableRow label="Average Weight" value="____" />
          <TableRow label="Average Height" value="____" />
          <TableRow label="BCG" value="____" />
          <TableRow label="OPV" value="____" />
          <TableRow label="DPT" value="____" />
          <TableRow label="Measles" value="____" />
        </Table>
      </Section>

      <Section title="Disease Incidences">
        <Table>
          <TableRow label="Respiratory Infections" value="____" />
          <TableRow label="Diarrhea" value="____" />
          <TableRow label="Malaria" value="____" />
          <TableRow label="Treatments Provided" value="____" />
        </Table>
      </Section>

      <Section title="Services Provided">
        <Table>
          <TableRow label="Nutritional Supplements" value="____" />
          <TableRow label="Health Education Sessions" value="____" />
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
