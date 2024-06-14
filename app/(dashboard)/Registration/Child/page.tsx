"use client";
import { useState, useEffect } from "react";
import { Input, Button, Select } from "antd";
import React from "react";
import { regions } from "@/constants/regions";
import { districts } from "@/constants/districts";
import { hospitals } from "@/constants/hospitals";
import NotificationModal from "@/app/components/NotificationModal";

const { Option } = Select;

interface Mother {
  url: string;
  healthcare_centre_name: string;
  mother_name: string;
  registration_number: string;
  mosquito_net_voucher_number: string;
  mother_age: string;
  mother_education: string;
  mother_employment: string;
  Height: string;
  partner_name: string;
  partner_age: string;
  partner_work: string;
  partner_education: string;
  address: string;
  Chairperson_name: string;
  pregnancies: string;
  alive_children: string;
  miscarriages: string;
  births: string;
  miscarriage_age: string;
  miscarriage_year: string;
}

const ChildDetailsForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    mother_name: "",
    healthcare_centre_name: "",
    child_number: "",
    child_name: "",
    child_gender: "",
    date_of_birth: "",
    weight_at_birth: "",
    length_at_birth: "",
    birth_region: "",
    birth_district: "",
    residential_region: "",
    residential_district: "",
    maternal_health_worker: "",
  });

  const [mothers, setMothers] = useState<Mother[]>([]);
  const [districtsByRegion, setDistrictsByRegion] = useState<string[]>([]);
  const [residentialDistrictsByRegion, setResidentialDistrictsByRegion] =
    useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/mother/");
        const data = await response.json();
        setMothers(data);
      } catch (error) {
        console.error("Error fetching mothers:", error);
      }
    };

    fetchMothers();
  }, []);

  const generateRegistrationNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear();
    const hospitalNumber =
      hospitals.indexOf(formValues.healthcare_centre_name) + 1;
    const hospitalNumberPadded = hospitalNumber.toString().padStart(4, "0");
    const patientType = "02"; // Since it's a child form

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/childStatistics/"
      );
      const data = await response.json();
      const patientNumber = (data.total_children + 1)
        .toString()
        .padStart(5, "0");

      return `${currentYear}${hospitalNumberPadded}${patientType}${patientNumber}`;
    } catch (error) {
      console.error("Error fetching child statistics:", error);
      return ""; // Return empty string in case of error
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });

    if (id === "healthcare_centre_name" || id === "mother_name") {
      const regNumber = await generateRegistrationNumber();
      setFormValues((prevValues) => ({
        ...prevValues,
        child_number: regNumber,
      }));
    }
  };

  const handleMotherNameChange = async (value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, mother_name: value }));
    const regNumber = await generateRegistrationNumber();
    setFormValues((prevValues) => ({ ...prevValues, child_number: regNumber }));
  };

  const handleChildGenderChange = (value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, child_gender: value }));
  };

  const handleMaternalHealthWorkerChange = (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      maternal_health_worker: value,
    }));
  };

  const handleBirthRegionChange = (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      birth_region: value,
      birth_district: "",
    }));
    setDistrictsByRegion(districts[value as keyof typeof districts]);
  };

  const handleResidentialRegionChange = (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      residential_region: value,
      residential_district: "",
    }));
    setResidentialDistrictsByRegion(districts[value as keyof typeof districts]);
  };

  const onFinish = async (e: any) => {
    e.preventDefault();

    const requiredFields = [
      "mother_name",
      "healthcare_centre_name",
      "child_number",
      "child_name",
      "child_gender",
      "date_of_birth",
      "weight_at_birth",
      "length_at_birth",
      "birth_region",
      "birth_district",
      "residential_region",
      "residential_district",
      "maternal_health_worker",
    ];

    for (const field of requiredFields) {
      if (!formValues[field as keyof typeof formValues]) {
        setModalMessage(`Please fill the ${field.replace("_", " ")} field.`);
        setModalVisible(true);
        return;
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/child/", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        method: "POST",
      });

      console.log("Response:", await response.json());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border border-blue-400 min-w-full">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Child Registration Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="mother_name" className="text-gray-700">
              Parent's Name
            </label>
            <Select
              id="mother_name"
              showSearch
              placeholder="Search and select mother"
              optionFilterProp="children"
              onChange={handleMotherNameChange}
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={formValues.mother_name}
              className="w-full"
            >
              {mothers.map((mother) => (
                <Option key={mother.url} value={mother.mother_name}>
                  {mother.mother_name}
                </Option>
              ))}
            </Select>
          </div>

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
                  child_number: regNumber,
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
            <label htmlFor="child_number" className="text-gray-700">
              Child's Number
            </label>
            <Input
              id="child_number"
              type="text"
              readOnly
              value={formValues.child_number}
              required
            />
          </div>

          <div>
            <label htmlFor="child_name" className="text-gray-700">
              Child's Name
            </label>
            <Input
              id="child_name"
              type="text"
              pattern="[A-Za-z\s]*"
              onChange={handleInputChange}
              value={formValues.child_name}
              required
            />
          </div>

          <div>
            <label htmlFor="child_gender" className="text-gray-700 block">
              Child's Gender
            </label>
            <Select
              id="child_gender"
              placeholder="Select Gender"
              className="w-full"
              onChange={handleChildGenderChange}
              value={formValues.child_gender}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="date_of_birth" className="text-gray-700">
              Date of Birth
            </label>
            <Input
              id="date_of_birth"
              type="date"
              onChange={handleInputChange}
              value={formValues.date_of_birth}
              required
            />
          </div>

          <div>
            <label htmlFor="weight_at_birth" className="text-gray-700">
              Weight at Birth (Kgs)
            </label>
            <Input
              id="weight_at_birth"
              type="number"
              onChange={handleInputChange}
              value={formValues.weight_at_birth}
              required
              min={0}
              step="any"
            />
          </div>

          <div>
            <label htmlFor="length_at_birth" className="text-gray-700">
              Length at Birth (Cm)
            </label>
            <Input
              id="length_at_birth"
              type="number"
              onChange={handleInputChange}
              value={formValues.length_at_birth}
              required
              min={0}
              step="any"
            />
          </div>

          <div>
            <label htmlFor="birth_region" className="text-gray-700">
              Birth Region
            </label>
            <Select
              id="birth_region"
              placeholder="Select Region"
              className="w-full"
              onChange={handleBirthRegionChange}
              value={formValues.birth_region}
            >
              {regions.map((region: any) => (
                <Option key={region} value={region}>
                  {region}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="birth_district" className="text-gray-700">
              Birth District
            </label>
            <Select
              id="birth_district"
              placeholder="Select District"
              className="w-full"
              onChange={(value) =>
                setFormValues({ ...formValues, birth_district: value })
              }
              value={formValues.birth_district}
              disabled={!formValues.birth_region}
            >
              {districtsByRegion.map((district) => (
                <Option key={district} value={district}>
                  {district}
                </Option>
              ))}
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
              {residentialDistrictsByRegion.map((district) => (
                <Option key={district} value={district}>
                  {district}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label
              htmlFor="maternal_health_worker"
              className="text-gray-700 block"
            >
              Maternal Health Worker
            </label>
            <Select
              id="maternal_health_worker"
              placeholder="Select Worker"
              className="w-full"
              onChange={handleMaternalHealthWorkerChange}
              value={formValues.maternal_health_worker}
            >
              <Option value="Healthcare Worker">Healthcare Worker</Option>
              <Option value="Traditional Birth Attendant (TBA)">
                Traditional Birth Attendant (TBA)
              </Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button type="primary" htmlType="submit" className="bg-rchs">
            Submit
          </Button>
        </div>
      </form>
      {modalVisible && (
        <NotificationModal
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default ChildDetailsForm;
