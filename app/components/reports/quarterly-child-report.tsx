// components/ChildFollowUpReport.tsx
"use client";
import React, { forwardRef, ReactNode } from 'react';

const QuarterlyReport = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="min-h-screen bg-gray-100 p-4 rounded-lg">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Child Follow-up Report</h1>
          <h2 className="text-lg">Clinic Name</h2>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">Prepared by</h3>
          <div className="text-gray-200">Date</div>
        </div>
      </header>

      <Section title="General Information">
        <Table>
          <TableRow label="Health Facility Name" value="____" />
          <TableRow label="District" value="____" />
          <TableRow label="Region" value="____" />
          <TableRow label="Month" value="____" />
          <TableRow label="Year" value="____" />
          <TableRow label="Report Preparer's Name" value="____" />
          <TableRow label="Date" value="____" />
          <TableRow label="Cadre" value="____" />
          <TableRow label="Position" value="____" />
          <TableRow label="Approved by" value="____" />
          <TableRow label="Facility/District/Region Phone Number" value="____" />
          <TableRow label="Date Report Received at District" value="____" />
        </Table>
      </Section>

      <Section title="Number of Registered Children">
        <TableWithGender>
          <GenderTableRow label="Vaccinated" />
          <GenderTableRow label="Unvaccinated" />
          <GenderTableRow label="Unknown Status" />
        </TableWithGender>
      </Section>

      <Section title="Attendance and Weight-for-Age/Height-for-Age Ratios (Under 1 Year)">
        <TableWithGender>
          <GenderTableRow label="Total Attendance (age 3 months)" />
          <GenderTableRow label="Weight-for-Age Ratio (>80% or >-2SD, 60-80% or -2 to -3SD, <60% or <-3SD)" />
          <GenderTableRow label="Weight-for-Height Ratio (>-2SD, -2 to -3SD, <-3SD)" />
          <GenderTableRow label="Height-for-Age Ratio (>-2SD, -2 to -3SD, <-3SD)" />
        </TableWithGender>
      </Section>

      <Section title="Attendance and Weight-for-Age/Height-for-Age Ratios (1 to 5 Years)">
        <TableWithGender>
          <GenderTableRow label="Total Attendance (age 6 months)" />
          <GenderTableRow label="Weight-for-Age Ratio (>80% or >-2SD, 60-80% or -2 to -3SD, <60% or <-3SD)" />
          <GenderTableRow label="Weight-for-Height Ratio (>-2SD, -2 to -3SD, <-3SD)" />
          <GenderTableRow label="Height-for-Age Ratio (>-2SD, -2 to -3SD, <-3SD)" />
        </TableWithGender>
      </Section>

      <Section title="Vitamin A Supplementation by Age">
        <TableWithGender>
          <GenderTableRow label="Children aged 6 months (Routine)" />
          <GenderTableRow label="Children under 1 year (Routine)" />
          <GenderTableRow label="Children aged 1 to 5 years (Routine)" />
          <GenderTableRow label="Children aged 6 months (Campaign)" />
          <GenderTableRow label="Children under 1 year (Campaign)" />
          <GenderTableRow label="Children aged 1 to 5 years (Campaign)" />
        </TableWithGender>
      </Section>

      <Section title="Deworming with Mebendazole/Albendazole">
        <TableWithGender>
          <GenderTableRow label="Children aged 1 to 5 years (Routine)" />
          <GenderTableRow label="Children aged 1 to 5 years (Campaign)" />
        </TableWithGender>
      </Section>

      <Section title="Feeding of Infants Born to HIV Positive Mothers">
        <TableWithGender>
          <GenderTableRow label="Infants under 6 months exclusively breastfed (EBF)" />
          <GenderTableRow label="Infants under 6 months not exclusively breastfed (with H in EBF)" />
        </TableWithGender>
      </Section>

      <Section title="PMTCT Information/Recipients">
        <TableWithGender>
          <GenderTableRow label="Children born to HIV positive mothers/children with HEID number" />
          <GenderTableRow label="Children referred to CTC for treatment and care" />
          <GenderTableRow label="Children given LLN" />
        </TableWithGender>
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

const GenderTableRow: React.FC<{ label: string }> = ({ label }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
  </tr>
);

export default QuarterlyReport;
