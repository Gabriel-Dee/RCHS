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

      <Section title="General Information">
        <Table>
          <TableRow label="Report Month" value="____" />
          <TableRow label="Report Year" value="____" />
          <TableRow label="Health Facility Name" value="____" />
          <TableRow label="District" value="____" />
          <TableRow label="Report Preparer's Name" value="____" />
          <TableRow label="Approved by" value="____" />
          <TableRow label="Position" value="____" />
          <TableRow label="Health Facility Phone Number" value="____" />
          <TableRow label="Designation" value="____" />
          <TableRow label="Date Prepared" value="____" />
          <TableRow label="Date Received at District" value="____" />
        </Table>
      </Section>

      <Section title="Section 1: Client Visits">
        <TableWithAgeGroups>
          <AgeGroupTableRow label="Number of clients who attended within 48 hours" />
          <AgeGroupTableRow label="Number of clients who attended between day 3 and day 7" />
          <AgeGroupTableRow label="Total who attended within the first 7 days" />
          <AgeGroupTableRow label="Number of clients who completed all visits" />
          <AgeGroupTableRow label="Clients with severe anemia (Hb < 8.5 g/dL)" />
          <AgeGroupTableRow label="Clients who developed complications after childbirth" />
          <AgeGroupTableRow label="Clients who experienced convulsions" />
          <AgeGroupTableRow label="Clients with infected/loosening stitches" />
          <AgeGroupTableRow label="Clients with fistula" />
        </TableWithAgeGroups>
      </Section>

      <Section title="Section 2: Delivered Outside Health Facilities">
        <TableWithAgeGroups>
          <AgeGroupTableRow label="Delivered before reaching health facility (BBA)" />
          <AgeGroupTableRow label="Delivered by traditional birth attendants (TBA)" />
          <AgeGroupTableRow label="Delivered at home" />
        </TableWithAgeGroups>
      </Section>

      <Section title="Section 3: Family Planning">
        <TableWithAgeGroups>
          <AgeGroupTableRow label="Received family planning advice" />
          <AgeGroupTableRow label="Received condoms" />
          <AgeGroupTableRow label="Received pills (POP)" />
          <AgeGroupTableRow label="Received implants (Implanon)" />
          <AgeGroupTableRow label="Received implants (Jadelle)" />
          <AgeGroupTableRow label="Received IUD" />
          <AgeGroupTableRow label="Sterilization (BTL)" />
          <AgeGroupTableRow label="Referred for family planning" />
        </TableWithAgeGroups>
      </Section>

      <Section title="Section 4: PMTCT">
        <TableWithAgeGroups>
          <AgeGroupTableRow label="Came for postnatal care while positive" />
          <AgeGroupTableRow label="Tested for HIV during postnatal care" />
          <AgeGroupTableRow label="Found to have HIV during postnatal care" />
          <AgeGroupTableRow label="HIV-positive mothers who chose exclusive breastfeeding (EBF)" />
          <AgeGroupTableRow label="HIV-positive mothers who chose replacement feeding (RF)" />
        </TableWithAgeGroups>
      </Section>

      <Section title="Section 5: Child Visits">
        <TableWithGender>
          <GenderTableRow label="Number of children who attended within 48 hours" />
          <GenderTableRow label="Number of children who attended between day 3 and day 7" />
          <GenderTableRow label="Total children who attended within the first 7 days" />
          <GenderTableRow label="Children who completed all visits" />
        </TableWithGender>
      </Section>

      <Section title="Section 6: Child Services/Tests">
        <TableWithGender>
          <GenderTableRow label="Number of children given BCG" />
          <GenderTableRow label="Number of children given OPV 0" />
          <GenderTableRow label="Number of children born weighing <2.5kg who received KMC" />
          <GenderTableRow label="Number of children born at home weighing <2.5kg" />
          <GenderTableRow label="Number of children born at home who started kangaroo care (KMC)" />
          <GenderTableRow label="Number of children with severe anemia (Hb < 10 g/dL or very pale palms)" />
        </TableWithGender>
      </Section>

      <Section title="Section 7: Child Infections">
        <TableWithGender>
          <GenderTableRow label="Number of children with severe infection (septicemia)" />
          <GenderTableRow label="Number of children with umbilical infection" />
          <GenderTableRow label="Number of children with skin infection" />
          <GenderTableRow label="Number of children with jaundice" />
          <GenderTableRow label="Number of newborn deaths (home births, perinatal, neonatal)" />
          <GenderTableRow label="Number of children given ARV drugs" />
        </TableWithGender>
      </Section>

      <Section title="Section 8: Child Feeding">
        <TableWithGender>
          <GenderTableRow label="Newborns exclusively breastfed (EBF)" />
          <GenderTableRow label="Newborns given replacement feeding (RF)" />
          <GenderTableRow label="Newborns given breast milk and other food (MF)" />
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

const AgeGroupTableRow: React.FC<{ label: string }> = ({ label }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
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

const GenderTableRow: React.FC<{ label: string }> = ({ label }) => (
  <tr className="border-t">
    <td className="p-2 font-semibold">{label}</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
    <td className="p-2">____</td>
  </tr>
);

export default MonthlyReport;
