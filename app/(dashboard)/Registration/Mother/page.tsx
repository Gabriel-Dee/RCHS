"use client";
import { useState } from "react";
import React from "react";
import { Input, Button, Select } from "antd";
import NotificationModal from "@/app/components/NotificationModal"; // Adjust the path according to your project structure
import { hospitals } from "@/constants/hospitals"; // Assuming you have a list of hospitals
import { regions } from "@/constants/regions"; // Assuming you have a list of regions
import { districts } from "@/constants/districts";

const { Option } = Select;

const ParentGuardianDetailsForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    healthcare_centre_name: "",
    mother_name: "",
    registration_number: "",
    mosquito_net_voucher_number: "",
    mother_age: "",
    mother_education: "",
    mother_employment: "",
    height: "",
    partner_name: "",
    partner_age: "",
    partner_work: "",
    partner_education: "",
    residential_region: "",
    residential_district: "",
    Chairperson_name: "",
    pregnancies: "",
    alive_children: "",
    miscarriages: "",
    births: "",
    registrant_type: "", // New field for Parent/Guardian
    parent_type: "", // New field for Mother/Father
    gender: "", // New field for Gender
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [residentialDistrictsByRegion, setResidentialDistrictsByRegion] =
    useState<string[]>([]);

  const generateRegistrationNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear();
    const hospitalNumber =
      hospitals.indexOf(formValues.healthcare_centre_name) + 1;
    const hospitalNumberPadded = hospitalNumber.toString().padStart(4, "0");
    const patientType = "01"; // Since it's a parent form

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/getParentStatistics/"
      );
      const data = await response.json();
      const patientNumber = (data.total_parents + 1)
        .toString()
        .padStart(5, "0");

      return `${currentYear}${hospitalNumberPadded}${patientType}${patientNumber}`;
    } catch (error) {
      console.error("Error fetching parent statistics:", error);
      return ""; // Return empty string in case of error
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    // Fields that should only accept alphabetic characters and spaces
    const textOnlyFields = [
      "mother_name",
      "mother_employment",
      "partner_name",
      "partner_work",
      "Chairperson_name",
    ];
    if (textOnlyFields.includes(id)) {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return; // If the value contains anything other than letters and spaces, do nothing
      }
    }
    setFormValues({ ...formValues, [id]: value });

    if (id === "healthcare_centre_name") {
      const regNumber = await generateRegistrationNumber();
      setFormValues((prevValues) => ({
        ...prevValues,
        child_number: regNumber,
      }));
    }
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const handleRegistrantTypeChange = (value: string) => {
    setFormValues({
      ...formValues,
      registrant_type: value,
      parent_type: "",
      gender: "",
    });
  };

  const handleParentTypeChange = (value: string) => {
    const gender = value === "mother" ? "female" : "male";
    setFormValues({ ...formValues, parent_type: value, gender });
  };

  const handleResidentialRegionChange = (value: string) => {
    setFormValues({
      ...formValues,
      residential_region: value,
      residential_district: "",
    });
    setResidentialDistrictsByRegion(districts[value as keyof typeof districts]);
  };

  const onFinish = async (e: any) => {
    e.preventDefault();

    // Validate form
    const requiredFields = [
      "healthcare_centre_name",
      "registration_number",
      "mosquito_net_voucher_number",
      "mother_name",
      "mother_age",
      "mother_education",
      "mother_employment",
      "height",
      "partner_name",
      "partner_age",
      "partner_work",
      "partner_education",
      "residential_region",
      "residential_district",
      "Chairperson_name",
    ];

    if (formValues.registrant_type === "parent") {
      requiredFields.push("parent_type", "gender");
    }

    // Validate required fields
    for (const field of requiredFields) {
      if (!formValues[field as keyof typeof formValues]) {
        setModalMessage(`Please fill the ${field.replace("_", " ")} field.`);
        setModalVisible(true);
        return;
      }
    }

    // Filter out unnecessary fields based on the registrant type
    let filteredFormValues: Partial<typeof formValues> = { ...formValues };

    if (
      formValues.registrant_type !== "parent" ||
      formValues.parent_type !== "mother"
    ) {
      const { pregnancies, alive_children, miscarriages, births, ...rest } =
        filteredFormValues;

      filteredFormValues = rest;
    }

    // Ensure filteredFormValues conforms to the expected structure
    filteredFormValues = {
      ...filteredFormValues,
    } as typeof formValues;

    try {
      console.log(filteredFormValues);

      const response = await fetch("http://127.0.0.1:8000/mother/", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredFormValues),
        method: "POST",
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Handle success scenario
        setModalMessage("Registration successful!");
        setModalVisible(true);
      } else {
        // Handle error scenario
        setModalMessage(
          data.detail || "An error occurred during registration."
        );
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("An error occurred during registration.");
      setModalVisible(true);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border border-blue-400 min-w-full">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Parent/Guardian Registration Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="healthcare_centre_name" className="text-gray-700">
              Healthcare Centre Name
            </label>
            <Select
              id="healthcare_centre_name"
              placeholder="Select Healthcare Centre"
              className="w-full"
              onChange={async (value) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  healthcare_centre_name: value,
                }));
                const regNumber = await generateRegistrationNumber();
                setFormValues((prevValues) => ({
                  ...prevValues,
                  registration_number: regNumber,
                }));
              }}
              value={formValues.healthcare_centre_name}
            >
              {hospitals.map((hospital: any) => (
                <Option key={hospital} value={hospital}>
                  {hospital}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="registrant_type" className="text-gray-700">
              Are you a Parent or Guardian?
            </label>
            <Select
              id="registrant_type"
              placeholder="Select Answer"
              className="w-full"
              onChange={handleRegistrantTypeChange}
              value={formValues.registrant_type}
            >
              <Option value="Parent">Parent</Option>
              <Option value="Guardian">Guardian</Option>
            </Select>
          </div>

          {formValues.registrant_type === "parent" && (
            <div>
              <label htmlFor="parent_type" className="text-gray-700">
                Are you the Mother or Father?
              </label>
              <Select
                id="parent_type"
                placeholder="Select Answer"
                className="w-full"
                onChange={handleParentTypeChange}
                value={formValues.parent_type}
              >
                <Option value="Mother">Mother</Option>
                <Option value="Father">Father</Option>
              </Select>
            </div>
          )}

          {(formValues.registrant_type === "guardian" ||
            (formValues.registrant_type === "parent" &&
              formValues.parent_type !== "")) && (
            <div>
              <label htmlFor="gender" className="text-gray-700">
                Gender
              </label>
              <Select
                id="gender"
                placeholder="Select Answer"
                className="w-full"
                onChange={(value) => handleSelectChange("gender", value)}
                value={formValues.gender}
                disabled={formValues.registrant_type === "parent"}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </div>
          )}

          <div>
            <label htmlFor="registration_number" className="text-gray-700">
              Registration Number
            </label>
            <Input
              id="registration_number"
              type="number"
              onChange={handleInputChange}
              value={formValues.registration_number}
              required
              min={0}
            />
          </div>

          <div>
            <label
              htmlFor="mosquito_net_voucher_number"
              className="text-gray-700"
            >
              Mosquito Net Voucher Number
            </label>
            <Input
              id="mosquito_net_voucher_number"
              type="number"
              onChange={handleInputChange}
              value={formValues.mosquito_net_voucher_number}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="mother_name" className="text-gray-700">
              Full Name
            </label>
            <Input
              id="mother_name"
              type="text"
              pattern="[A-Za-z\s]*"
              onChange={handleInputChange}
              value={formValues.mother_name}
              required
            />
          </div>

          <div>
            <label htmlFor="mother_age" className="text-gray-700">
              Age (Years)
            </label>
            <Input
              id="mother_age"
              type="number"
              onChange={handleInputChange}
              value={formValues.mother_age}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="mother_education" className="text-gray-700">
              Education
            </label>
            <Select
              id="mother_education"
              placeholder="Select Visit Number"
              className="w-full"
              onChange={(value) =>
                setFormValues({ ...formValues, mother_education: value })
              }
              value={formValues.mother_education}
            >
              <Option value="Primary">Primary School</Option>
              <Option value="Secondary">Secondary School</Option>
              <Option value="College">College</Option>
              <Option value="University">University</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="mother_employment" className="text-gray-700">
              Work/Employment
            </label>
            <Input
              id="mother_employment"
              type="text"
              onChange={handleInputChange}
              value={formValues.mother_employment}
            />
          </div>

          <div>
            <label htmlFor="height" className="text-gray-700 block">
              Height (Cm)
            </label>
            <Input
              id="height"
              type="number"
              onChange={handleInputChange}
              value={formValues.height}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="partner_name" className="text-gray-700">
              Partner's/Companion's Name
            </label>
            <Input
              id="partner_name"
              type="text"
              onChange={handleInputChange}
              value={formValues.partner_name}
            />
          </div>

          <div>
            <label htmlFor="partner_age" className="text-gray-700">
              Partner's/Companion's Age
            </label>
            <Input
              id="partner_age"
              type="number"
              onChange={handleInputChange}
              value={formValues.partner_age}
              min={0}
            />
          </div>

          <div>
            <label htmlFor="partner_work" className="text-gray-700">
              Partner's/Companion's Work
            </label>
            <Input
              id="partner_work"
              type="text"
              onChange={handleInputChange}
              value={formValues.partner_work}
            />
          </div>

          <div>
            <label htmlFor="partner_education" className="text-gray-700">
              Partner's/Companion's Education
            </label>
            <Select
              id="partner_education"
              placeholder="Select Visit Number"
              className="w-full"
              onChange={(value) =>
                setFormValues({ ...formValues, partner_education: value })
              }
              value={formValues.partner_education}
            >
              <Option value="primary">Primary School</Option>
              <Option value="secondary">Secondary School</Option>
              <Option value="college">College</Option>
              <Option value="university">University</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="residential_region" className="text-gray-700">
              Residential Region
            </label>
            <Select
              id="residential_region"
              placeholder="Select Region"
              className="w-full"
              onChange={handleResidentialRegionChange}
              value={formValues.residential_region}
            >
              {regions.map((region: any) => (
                <Option key={region} value={region}>
                  {region}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="residential_district" className="text-gray-700">
              Residential District
            </label>
            <Select
              id="residential_district"
              placeholder="Select District"
              className="w-full"
              onChange={(value) =>
                setFormValues({ ...formValues, residential_district: value })
              }
              value={formValues.residential_district}
              disabled={!formValues.residential_region}
            >
              {residentialDistrictsByRegion.map((district: any) => (
                <Option key={district} value={district}>
                  {district}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="Chairperson_name" className="text-gray-700">
              Chairperson's Name
            </label>
            <Input
              id="Chairperson_name"
              type="text"
              onChange={handleInputChange}
              value={formValues.Chairperson_name}
            />
          </div>

          {formValues.registrant_type === "parent" &&
            formValues.parent_type === "mother" && (
              <>
                <div>
                  <label htmlFor="pregnancies" className="text-gray-700">
                    How many pregnancies
                  </label>
                  <Input
                    id="pregnancies"
                    type="number"
                    onChange={handleInputChange}
                    value={formValues.pregnancies}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="births" className="text-gray-700">
                    How many times has she given birth
                  </label>
                  <Input
                    id="births"
                    type="number"
                    onChange={handleInputChange}
                    value={formValues.births}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="alive_children" className="text-gray-700">
                    Alive Children
                  </label>
                  <Input
                    id="alive_children"
                    type="number"
                    onChange={handleInputChange}
                    value={formValues.alive_children}
                    required
                    min={0}
                  />
                </div>

                <div>
                  <label htmlFor="miscarriages" className="text-gray-700">
                    Miscarriages
                  </label>
                  <Input
                    id="miscarriages"
                    type="number"
                    onChange={handleInputChange}
                    value={formValues.miscarriages}
                    required
                    min={0}
                  />
                </div>
              </>
            )}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            onClick={onFinish}
            htmlType="submit"
            className="bg-rchs"
          >
            Submit
          </Button>
        </div>
      </form>

      {/* Notification Modal for Required Fields */}
      {modalVisible && (
        <NotificationModal
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default ParentGuardianDetailsForm;
