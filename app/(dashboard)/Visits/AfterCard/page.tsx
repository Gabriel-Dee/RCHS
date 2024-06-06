"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Divider, Select } from "antd";

const { Option } = Select;

interface Child {
  url: string;
  id: string;
  child_name: string;
  healthcare_centre_name: string;
  mother_name: string;
  mother: string;
  child_number: string;
  child_gender: string;
  date_of_birth: string;
  weight_at_birth: string;
  length_at_birth: string;
  place_of_birth: string;
  maternal_health_worker: string;
  child_residence: string;
}

const ChildVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    child_name: "",
    visit_number: "",
    date: "",
    child_growth_and_development_status: "",
    return_date: "",
    bcg_tuberculosis_injection_right_shoulder: "",
    polio: "",
    dpt_hep_b: "",
    pneumococcal: "",
    rota: "",
    measles: "",
    vitamin_a: "",
    deworming_medication: "",
    weight_grams: "",
    height: "",
    anemia: "",
    body_temperature: "",
    exclusive_breastfeeding: "",
    replacement_milk: "",
    unable_to_breastfeed: "",
    child_play: "",
    eyes: "",
    mouth: "",
    ears: "",
    navel_healed: "",
    navel_red: "",
    navel_discharge_odor: "",
    has_pus_filled_bumps: "",
    has_turned_yellow: "",
    received_bcg: "",
    received_polio_0: "",
    received_polio_1: "",
    received_dtp_hep_hib: "",
    received_pneumococcal: "",
    received_rota: "",
    name_of_attendant: "",
    attendant_title: "",
    other_issues: "",
  });

  const [children, setChildren] = useState<Child[]>([]);

  // Fetch Child list from the server
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/child/");
        const data = await response.json();
        console.log("Children data:", data); // Log the fetched data
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Specific handlers for select changes
  const handlechildNameChange = (value: string) => {
    setFormValues({ ...formValues, child_name: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormValues({ ...formValues, [id]: value });
  };

  // Handler for form submission
  const onFinish = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(formValues);

      const response = await fetch("http://127.0.0.1:8000/child_visit/", {
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
        Child Visit Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        {/* Section 1: Basic Information */}
        <Divider orientation="left" className="text-lg font-semibold">
          Basic Information
        </Divider>
        <div>
          <label htmlFor="child_name" className="text-gray-700">
            Child's Name
          </label>
          <Select
            id="child_name"
            showSearch
            placeholder="Search and select child"
            optionFilterProp="children"
            onChange={handlechildNameChange}
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            value={formValues.child_name}
            className="w-full"
          >
            {children.map((child) => (
              <Option key={child.url} value={child.child_name}>
                {child.child_name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="visit_number" className="text-gray-700">
              Visit Number
            </label>
            <Input
              id="visit_number"
              type="number"
              onChange={handleInputChange}
              value={formValues.visit_number}
            />
          </div>
          <div>
            <label htmlFor="date" className="text-gray-700">
              Visit Date
            </label>
            <Input
              id="date"
              type="date"
              onChange={handleInputChange}
              value={formValues.date}
            />
          </div>
          <div>
            <label
              htmlFor="child_growth_and_development_status"
              className="text-gray-700"
            >
              Child Growth and Development Status
            </label>
            <Input
              id="child_growth_and_development_status"
              onChange={handleInputChange}
              value={formValues.child_growth_and_development_status}
            />
          </div>
          <div>
            <label htmlFor="return_date" className="text-gray-700">
              Return Date
            </label>
            <Input
              id="return_date"
              type="date"
              onChange={handleInputChange}
              value={formValues.return_date}
            />
          </div>
          <div>
            <label htmlFor="weight_grams" className="text-gray-700">
              Weight (Grams)
            </label>
            <Input
              id="weight_grams"
              type="number"
              onChange={handleInputChange}
              value={formValues.weight_grams}
            />
          </div>
          <div>
            <label htmlFor="height" className="text-gray-700">
              Height (Cm)
            </label>
            <Input
              id="height"
              type="number"
              onChange={handleInputChange}
              value={formValues.height}
            />
          </div>
          <div>
            <label htmlFor="anemia" className="text-gray-700">
              Anemia (Hb or palmar pallor)
            </label>
            <Input
              id="anemia"
              onChange={handleInputChange}
              value={formValues.anemia}
            />
          </div>
          <div>
            <label htmlFor="body_temperature" className="text-gray-700">
              Body temperature (°C)
            </label>
            <Input
              id="body_temperature"
              type="number"
              step="0.01"
              onChange={handleInputChange}
              value={formValues.body_temperature}
            />
          </div>
          {/* Add more input fields for basic information */}
        </div>

        {/* Section 2: Vaccinations */}
        <Divider orientation="left" className="text-lg font-semibold">
          Vaccinations
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bcg_tuberculosis_injection_right_shoulder"
              className="text-gray-700"
            >
              BCG Tuberculosis Injection (Right Shoulder)
            </label>
            <Input
              id="bcg_tuberculosis_injection_right_shoulder"
              onChange={handleInputChange}
              value={formValues.bcg_tuberculosis_injection_right_shoulder}
            />
          </div>
          {/* Polio */}
          <div>
            <label htmlFor="polio" className="text-gray-700">
              Polio
            </label>
            <Input
              id="polio"
              onChange={handleInputChange}
              value={formValues.polio}
            />
          </div>

          {/* DPT Hep B */}
          <div>
            <label htmlFor="dpt_hep_b" className="text-gray-700">
              DPT Hep B
            </label>
            <Input
              id="dpt_hep_b"
              onChange={handleInputChange}
              value={formValues.dpt_hep_b}
            />
          </div>

          {/* Pneumococcal */}
          <div>
            <label htmlFor="pneumococcal" className="text-gray-700">
              Pneumococcal
            </label>
            <Input
              id="pneumococcal"
              onChange={handleInputChange}
              value={formValues.pneumococcal}
            />
          </div>

          {/* Rota */}
          <div>
            <label htmlFor="rota" className="text-gray-700">
              Rota
            </label>
            <Input
              id="rota"
              onChange={handleInputChange}
              value={formValues.rota}
            />
          </div>

          {/* Measles */}
          <div>
            <label htmlFor="measles" className="text-gray-700">
              Measles
            </label>
            <Input
              id="measles"
              onChange={handleInputChange}
              value={formValues.measles}
            />
          </div>

          {/* Vitamin A */}
          <div>
            <label htmlFor="vitamin_a" className="text-gray-700">
              Vitamin A
            </label>
            <Input
              id="vitamin_a"
              onChange={handleInputChange}
              value={formValues.vitamin_a}
            />
          </div>

          {/* Deworming Medication */}
          <div>
            <label htmlFor="deworming_medication" className="text-gray-700">
              Deworming Medication
            </label>
            <Input
              id="deworming_medication"
              onChange={handleInputChange}
              value={formValues.deworming_medication}
            />
          </div>
          {/* Exclusive Breastfeeding */}
          <div>
            <label htmlFor="exclusive_breastfeeding" className="text-gray-700">
              Exclusive Breastfeeding (EBF)
            </label>
            <Input
              id="exclusive_breastfeeding"
              onChange={handleInputChange}
              value={formValues.exclusive_breastfeeding}
            />
          </div>

          {/* Replacement Milk */}
          <div>
            <label htmlFor="replacement_milk" className="text-gray-700">
              Replacement Milk (RF)
            </label>
            <Input
              id="replacement_milk"
              onChange={handleInputChange}
              value={formValues.replacement_milk}
            />
          </div>

          {/* Unable to Breastfeed */}
          <div>
            <label htmlFor="unable_to_breastfeed" className="text-gray-700">
              Unable to Breastfeed
            </label>
            <Input
              id="unable_to_breastfeed"
              onChange={handleInputChange}
              value={formValues.unable_to_breastfeed}
            />
          </div>

          {/* Child Play */}
          <div>
            <label htmlFor="child_play" className="text-gray-700">
              Child Play
            </label>
            <Input
              id="child_play"
              onChange={handleInputChange}
              value={formValues.child_play}
            />
          </div>

          {/* Eyes */}
          <div>
            <label htmlFor="eyes" className="text-gray-700">
              Eyes
            </label>
            <Input
              id="eyes"
              onChange={handleInputChange}
              value={formValues.eyes}
            />
          </div>

          {/* Mouth */}
          <div>
            <label htmlFor="mouth" className="text-gray-700">
              Mouth
            </label>
            <Input
              id="mouth"
              onChange={handleInputChange}
              value={formValues.mouth}
            />
          </div>

          {/* Ears */}
          <div>
            <label htmlFor="ears" className="text-gray-700">
              Ears
            </label>
            <Input
              id="ears"
              onChange={handleInputChange}
              value={formValues.ears}
            />
          </div>

          {/* Navel Healed */}
          <div>
            <label htmlFor="navel_healed" className="text-gray-700">
              Navel Healed
            </label>
            <Select
              id="navel_healed"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("navel_healed", value)}
              value={formValues.navel_healed}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Navel Red */}
          <div>
            <label htmlFor="navel_red" className="text-gray-700">
              Navel Red
            </label>
            <Select
              id="navel_red"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("navel_red", value)}
              value={formValues.navel_red}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Navel Discharge Odor */}
          <div>
            <label htmlFor="navel_discharge_odor" className="text-gray-700">
              Navel Discharge Odor
            </label>
            <Select
              id="navel_discharge_odor"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("navel_discharge_odor", value)
              }
              value={formValues.navel_discharge_odor}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Has pus-filled bumps */}
          <div>
            <label htmlFor="has_pus_filled_bumps" className="text-gray-700">
              Has Pus-filled Bumps
            </label>
            <Select
              id="has_pus_filled_bumps"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("has_pus_filled_bumps", value)
              }
              value={formValues.has_pus_filled_bumps}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Has turned yellow */}
          <div>
            <label htmlFor="has_turned_yellow" className="text-gray-700">
              Has Turned Yellow
            </label>
            <Select
              id="has_turned_yellow"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("has_turned_yellow", value)
              }
              value={formValues.has_turned_yellow}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received BCG */}
          <div>
            <label htmlFor="received_bcg" className="text-gray-700">
              Received BCG
            </label>
            <Select
              id="received_bcg"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("received_bcg", value)}
              value={formValues.received_bcg}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received Polio 0 */}
          <div>
            <label htmlFor="received_polio_0" className="text-gray-700">
              Received Polio 0
            </label>
            <Select
              id="received_polio_0"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("received_polio_0", value)
              }
              value={formValues.received_polio_0}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received Polio 1 */}
          <div>
            <label htmlFor="received_polio_1" className="text-gray-700">
              Received Polio 1
            </label>
            <Select
              id="received_polio_1"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("received_polio_1", value)
              }
              value={formValues.received_polio_1}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received DTP Hep Hib */}
          <div>
            <label htmlFor="received_dtp_hep_hib" className="text-gray-700">
              Received DTP Hep Hib
            </label>
            <Select
              id="received_dtp_hep_hib"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("received_dtp_hep_hib", value)
              }
              value={formValues.received_dtp_hep_hib}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received Pneumococcal */}
          <div>
            <label htmlFor="received_pneumococcal" className="text-gray-700">
              Received Pneumococcal
            </label>
            <Select
              id="received_pneumococcal"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("received_pneumococcal", value)
              }
              value={formValues.received_pneumococcal}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Received Rota */}
          <div>
            <label htmlFor="received_rota" className="text-gray-700">
              Received Rota
            </label>
            <Select
              id="received_rota"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("received_rota", value)}
              value={formValues.received_rota}
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>

          {/* Name of Attendant */}
          <div>
            <label htmlFor="name_of_attendant" className="text-gray-700">
              Name of Attendant
            </label>
            <Input
              id="name_of_attendant"
              onChange={handleInputChange}
              value={formValues.name_of_attendant}
            />
          </div>

          {/* Attendant Title */}
          <div>
            <label htmlFor="attendant_title" className="text-gray-700">
              Attendant Title
            </label>
            <Input
              id="attendant_title"
              onChange={handleInputChange}
              value={formValues.attendant_title}
            />
          </div>

          {/* Other Issues */}
          <div>
            <label htmlFor="other_issues" className="text-gray-700">
              Other Issues
            </label>
            <Input
              id="other_issues"
              onChange={handleInputChange}
              value={formValues.other_issues}
            />
          </div>
        </div>

        {/* Add more sections for other details */}

        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            // onClick={onFinish}
            htmlType="submit"
            className="bg-rchs"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ChildVisitForm;
