"use client";
import React from "react";

interface PersonalInfoProps {
  childData: any;
}

const calculateAge = (dob: string): string => {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} years, ${months} months`;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ childData }) => {
  const personalInfo = childData
    ? [
        { attribute: "Full name:", value: childData.child_name },
        { attribute: "Parent's name:", value: childData.mother_name },
        {
          attribute: "Age:",
          value: childData.date_of_birth
            ? calculateAge(childData.date_of_birth)
            : "N/A",
        },
        { attribute: "Gender:", value: childData.child_gender || "N/A" },
        {
          attribute: "Weight at Birth(kg):",
          value: childData.weight_at_birth
            ? childData.weight_at_birth.toString()
            : "N/A",
        },
        {
          attribute: "Length at Births(cm):",
          value: childData.length_at_birth
            ? childData.length_at_birth.toString()
            : "N/A",
        },
      ]
    : [];

    console.log("This is child dara",childData)

  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 border border-rchs rounded-md">
      <div className="w-full flex flex-col 2xl:w-1/3 min-w-full">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="row" className="px-6 py-3 text-xl">
                  Personal Information
                </th>
                <th scope="col" className="px-6 py-3">
                  {/* Information */}
                </th>
              </tr>
            </thead>
            <tbody>
              {personalInfo.map((info, index) => (
                <tr
                  key={index}
                  className={`bg-white ${
                    index !== personalInfo.length - 1
                      ? "border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      : "dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {info.attribute}
                  </th>
                  <td className="px-6 py-4">{info.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
