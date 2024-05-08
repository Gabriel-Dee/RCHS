"use client";
import React from "react";
import { useState } from "react";
import { Input, Button, Select, Divider } from "antd";
import axios from "axios";

const { Option } = Select;

const ChildVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    Date: "",
    Child_growth_and_development_status: "",
    Return_date: "",
    Bcg_tuberculosis_injection_right_shoulder: "",
    Polio: "",
    Dpt_hep_b: "",
    Pneumococcal: "",
    Rota: "",
    Measles: "",
    Vitamin_a: "",
    Deworming_medication: "",
    Weight_grams: "",
    Anemia: "",
    Body_temperature: "",
    Exclusive_breastfeeding: "",
    Replacement_milk: "",
    Unable_to_breastfeed: "",
    Child_play: "",
    Eyes: "",
    Mouth: "",
    Ears: "",
    Navel_Healed: "",
    Navel_Red: "",
    Navel_Discharge_odor: "",
    Has_pus_filled_bumps: "",
    Has_turned_yellow: "",
    Received_BCG: "",
    Received_Polio_0: "",
    Received_Polio_1: "",
    Received_DTP_Hep_Hib: "",
    Received_Pneumococcal: "",
    Received_Rota: "",
    Name_of_attendant: "",
    Attendant_title: "",
    Other_issues: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const onFinish = async () => {
    try {
      console.log(formValues);
      const response = await axios.post(
        "http://127.0.0.1:8000/child_visit/",
        formValues
      );
      console.log("Response:", response.data);
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="Date" className="text-gray-700">
              Visit Date
            </label>
            <Input
              id="Date"
              type="date"
              onChange={handleInputChange}
              value={formValues.Date}
            />
          </div>
          <div>
            <label
              htmlFor="Child_growth_and_development_status"
              className="text-gray-700"
            >
              Child Growth and Development Status
            </label>
            <Input
              id="Child_growth_and_development_status"
              onChange={handleInputChange}
              value={formValues.Child_growth_and_development_status}
            />
          </div>
          <div>
            <label htmlFor="Return_date" className="text-gray-700">
              Return Date
            </label>
            <Input
              id="Return_date"
              type="date"
              onChange={handleInputChange}
              value={formValues.Return_date}
            />
          </div>
          <div>
            <label htmlFor="Weight_grams" className="text-gray-700">
              Weight (Grams)
            </label>
            <Input
              id="Weight_grams"
              type="number"
              onChange={handleInputChange}
              value={formValues.Weight_grams}
            />
          </div>
          <div>
            <label htmlFor="Anemia" className="text-gray-700">
              Anemia (Hb or palmar pallor)
            </label>
            <Input
              id="Anemia"
              onChange={handleInputChange}
              value={formValues.Anemia}
            />
          </div>
          <div>
            <label htmlFor="Body_temperature" className="text-gray-700">
              Body temperature (°C)
            </label>
            <Input
              id="Body_temperature"
              type="number"
              step="0.01"
              onChange={handleInputChange}
              value={formValues.Body_temperature}
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
              htmlFor="Bcg_tuberculosis_injection_right_shoulder"
              className="text-gray-700"
            >
              BCG Tuberculosis Injection (Right Shoulder)
            </label>
            <Input
              id="Bcg_tuberculosis_injection_right_shoulder"
              onChange={handleInputChange}
              value={formValues.Bcg_tuberculosis_injection_right_shoulder}
            />
          </div>
          {/* Polio */}
          <div>
            <label htmlFor="Polio" className="text-gray-700">
              Polio
            </label>
            <Input
              id="Polio"
              onChange={handleInputChange}
              value={formValues.Polio}
            />
          </div>

          {/* DPT Hep B */}
          <div>
            <label htmlFor="Dpt_hep_b" className="text-gray-700">
              DPT Hep B
            </label>
            <Input
              id="Dpt_hep_b"
              onChange={handleInputChange}
              value={formValues.Dpt_hep_b}
            />
          </div>

          {/* Pneumococcal */}
          <div>
            <label htmlFor="Pneumococcal" className="text-gray-700">
              Pneumococcal
            </label>
            <Input
              id="Pneumococcal"
              onChange={handleInputChange}
              value={formValues.Pneumococcal}
            />
          </div>

          {/* Rota */}
          <div>
            <label htmlFor="Rota" className="text-gray-700">
              Rota
            </label>
            <Input
              id="Rota"
              onChange={handleInputChange}
              value={formValues.Rota}
            />
          </div>

          {/* Measles */}
          <div>
            <label htmlFor="Measles" className="text-gray-700">
              Measles
            </label>
            <Input
              id="Measles"
              onChange={handleInputChange}
              value={formValues.Measles}
            />
          </div>

          {/* Vitamin A */}
          <div>
            <label htmlFor="Vitamin_a" className="text-gray-700">
              Vitamin A
            </label>
            <Input
              id="Vitamin_a"
              onChange={handleInputChange}
              value={formValues.Vitamin_a}
            />
          </div>

          {/* Deworming Medication */}
          <div>
            <label htmlFor="Deworming_medication" className="text-gray-700">
              Deworming Medication
            </label>
            <Input
              id="Deworming_medication"
              onChange={handleInputChange}
              value={formValues.Deworming_medication}
            />
          </div>

          {/* Weight (grams) */}
          <div>
            <label htmlFor="Weight_grams" className="text-gray-700">
              Weight (Grams)
            </label>
            <Input
              id="Weight_grams"
              type="number"
              onChange={handleInputChange}
              value={formValues.Weight_grams}
            />
          </div>

          {/* Anemia */}
          <div>
            <label htmlFor="Anemia" className="text-gray-700">
              Anemia (Hb or palmar pallor)
            </label>
            <Input
              id="Anemia"
              onChange={handleInputChange}
              value={formValues.Anemia}
            />
          </div>

          {/* Body Temperature */}
          <div>
            <label htmlFor="Body_temperature" className="text-gray-700">
              Body Temperature (°C)
            </label>
            <Input
              id="Body_temperature"
              type="number"
              step="0.01"
              onChange={handleInputChange}
              value={formValues.Body_temperature}
            />
          </div>
          {/* Exclusive Breastfeeding */}
          <div>
            <label htmlFor="Exclusive_breastfeeding" className="text-gray-700">
              Exclusive Breastfeeding (EBF)
            </label>
            <Input
              id="Exclusive_breastfeeding"
              onChange={handleInputChange}
              value={formValues.Exclusive_breastfeeding}
            />
          </div>

          {/* Replacement Milk */}
          <div>
            <label htmlFor="Replacement_milk" className="text-gray-700">
              Replacement Milk (RF)
            </label>
            <Input
              id="Replacement_milk"
              onChange={handleInputChange}
              value={formValues.Replacement_milk}
            />
          </div>

          {/* Unable to Breastfeed */}
          <div>
            <label htmlFor="Unable_to_breastfeed" className="text-gray-700">
              Unable to Breastfeed
            </label>
            <Input
              id="Unable_to_breastfeed"
              onChange={handleInputChange}
              value={formValues.Unable_to_breastfeed}
            />
          </div>

          {/* Child Play */}
          <div>
            <label htmlFor="Child_play" className="text-gray-700">
              Child Play
            </label>
            <Input
              id="Child_play"
              onChange={handleInputChange}
              value={formValues.Child_play}
            />
          </div>

          {/* Eyes */}
          <div>
            <label htmlFor="Eyes" className="text-gray-700">
              Eyes
            </label>
            <Input
              id="Eyes"
              onChange={handleInputChange}
              value={formValues.Eyes}
            />
          </div>

          {/* Mouth */}
          <div>
            <label htmlFor="Mouth" className="text-gray-700">
              Mouth
            </label>
            <Input
              id="Mouth"
              onChange={handleInputChange}
              value={formValues.Mouth}
            />
          </div>

          {/* Ears */}
          <div>
            <label htmlFor="Ears" className="text-gray-700">
              Ears
            </label>
            <Input
              id="Ears"
              onChange={handleInputChange}
              value={formValues.Ears}
            />
          </div>

          {/* Navel Healed */}
          <div>
            <label htmlFor="Navel_Healed" className="text-gray-700">
              Navel Healed
            </label>
            <Input
              id="Navel_Healed"
              onChange={handleInputChange}
              value={formValues.Navel_Healed}
            />
          </div>

          {/* Navel Red */}
          <div>
            <label htmlFor="Navel_Red" className="text-gray-700">
              Navel Red
            </label>
            <Input
              id="Navel_Red"
              onChange={handleInputChange}
              value={formValues.Navel_Red}
            />
          </div>

          {/* Navel Discharge Odor */}
          <div>
            <label htmlFor="Navel_Discharge_odor" className="text-gray-700">
              Navel Discharge Odor
            </label>
            <Input
              id="Navel_Discharge_odor"
              onChange={handleInputChange}
              value={formValues.Navel_Discharge_odor}
            />
          </div>
          {/* Has pus-filled bumps */}
          <div>
            <label htmlFor="Has_pus_filled_bumps" className="text-gray-700">
              Has Pus-filled Bumps
            </label>
            <Input
              id="Has_pus_filled_bumps"
              onChange={handleInputChange}
              value={formValues.Has_pus_filled_bumps}
            />
          </div>

          {/* Has turned yellow */}
          <div>
            <label htmlFor="Has_turned_yellow" className="text-gray-700">
              Has Turned Yellow
            </label>
            <Input
              id="Has_turned_yellow"
              onChange={handleInputChange}
              value={formValues.Has_turned_yellow}
            />
          </div>

          {/* Received BCG */}
          <div>
            <label htmlFor="Received_BCG" className="text-gray-700">
              Received BCG
            </label>
            <Input
              id="Received_BCG"
              onChange={handleInputChange}
              value={formValues.Received_BCG}
            />
          </div>

          {/* Received Polio 0 */}
          <div>
            <label htmlFor="Received_Polio_0" className="text-gray-700">
              Received Polio 0
            </label>
            <Input
              id="Received_Polio_0"
              onChange={handleInputChange}
              value={formValues.Received_Polio_0}
            />
          </div>

          {/* Received Polio 1 */}
          <div>
            <label htmlFor="Received_Polio_1" className="text-gray-700">
              Received Polio 1
            </label>
            <Input
              id="Received_Polio_1"
              onChange={handleInputChange}
              value={formValues.Received_Polio_1}
            />
          </div>

          {/* Received DTP Hep Hib */}
          <div>
            <label htmlFor="Received_DTP_Hep_Hib" className="text-gray-700">
              Received DTP Hep Hib
            </label>
            <Input
              id="Received_DTP_Hep_Hib"
              onChange={handleInputChange}
              value={formValues.Received_DTP_Hep_Hib}
            />
          </div>

          {/* Received Pneumococcal */}
          <div>
            <label htmlFor="Received_Pneumococcal" className="text-gray-700">
              Received Pneumococcal
            </label>
            <Input
              id="Received_Pneumococcal"
              onChange={handleInputChange}
              value={formValues.Received_Pneumococcal}
            />
          </div>

          {/* Received Rota */}
          <div>
            <label htmlFor="Received_Rota" className="text-gray-700">
              Received Rota
            </label>
            <Input
              id="Received_Rota"
              onChange={handleInputChange}
              value={formValues.Received_Rota}
            />
          </div>

          {/* Name of Attendant */}
          <div>
            <label htmlFor="Name_of_attendant" className="text-gray-700">
              Name of Attendant
            </label>
            <Input
              id="Name_of_attendant"
              onChange={handleInputChange}
              value={formValues.Name_of_attendant}
            />
          </div>

          {/* Attendant Title */}
          <div>
            <label htmlFor="Attendant_title" className="text-gray-700">
              Attendant Title
            </label>
            <Input
              id="Attendant_title"
              onChange={handleInputChange}
              value={formValues.Attendant_title}
            />
          </div>

          {/* Other Issues */}
          <div>
            <label htmlFor="Other_issues" className="text-gray-700">
              Other Issues
            </label>
            <Input
              id="Other_issues"
              onChange={handleInputChange}
              value={formValues.Other_issues}
            />
          </div>
        </div>

        {/* Add more sections for other details */}

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
    </section>
  );
};

export default ChildVisitForm;
