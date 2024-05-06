"use client";
import { useState } from "react";
import { Input, Button, Select, Checkbox, Divider } from "antd";
import axios from "axios";
import React from "react";

const { Option } = Select;

const ClinicVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    // Section 1: Visit Information
    visit_date: "",
    visit_number: "",

    // Section 2: Health Measurements
    body_temperature: "",
    blood_pressure: "",
    hb_percentage: "",
    pmtct_nutrition: "",

    // Section 3: Breastfeeding
    breastfeeding: "",
    milk_coming_out: "",
    breastfeeding_within_hour: "",
    sore_nipples: "",
    full_nipples: "",
    abscesses: "",
    breastfeeding_advice: "",

    // Section 4: Uterus
    uterus_shrinking: "",
    uterus_pain: "",

    // Section 5: Incision / Surgical wound
    incision_did_not_tear: "",
    incision_type: "",
    wound_healed: "",
    pus: "",
    wound_open: "",
    bad_smell: "",
    lochia_amount: "",
    lochia_color: "",

    // Section 6: Mental State
    mental_state: "",
    mental_issues: "",

    // Section 7: Family Planning
    advice_given: "",

    // Section 8: Prophylactic Medications
    ferrous_sulphate: false,
    folic_acid: false,
    tetanus_toxoid_doses: "",

    // Section 9: Provider Information
    pmtct_ctx: "",
    postpartum_medications: "",
    vitamin_a: "",
    date_of_next_visit: "",
    provider_name: "",
    provider_title: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormValues({ ...formValues, [id]: checked });
  };

  const onFinish = async () => {
    try {
      console.log(formValues);
      const response = await axios.post(
        "http://127.0.0.1:8000/mother_visit/",
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
        Clinic Visit Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
      {/* Section 1: Visit Information */}
      <Divider orientation="left" className="text-lg font-semibold">
        Visit Information
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="visit_date" className="text-gray-700">
            Visit Date
          </label>
          <Input
            id="visit_date"
            type="date"
            onChange={handleInputChange}
            value={formValues.visit_date}
          />
        </div>

        <div>
          <label htmlFor="visit_number" className="text-gray-700 block">
            Visit Number
          </label>
          <Select
            id="visit_number"
            placeholder="Select Visit Number"
            className="w-full"
            onChange={(value) =>
              setFormValues({ ...formValues, visit_number: value })
            }
            value={formValues.visit_number}
          >
            <Option value="first">First (within 48 hrs)</Option>
            <Option value="second">Second (within 7 days)</Option>
            <Option value="third">Third (in 2 weeks)</Option>
            <Option value="fourth">Fourth (in 42 days)</Option>
          </Select>
        </div>
      </div>

      {/* Section 2: Health Measurements */}
      <Divider orientation="left" className="text-lg font-semibold">
        Health Measurements
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="body_temperature" className="text-gray-700">
            Body Temperature (°C)
          </label>
          <Input
            id="body_temperature"
            type="number"
            step="0.01"
            onChange={handleInputChange}
            value={formValues.body_temperature}
          />
        </div>

        <div>
          <label htmlFor="blood_pressure" className="text-gray-700">
            Blood Pressure (mmHg)
          </label>
          <Input
            id="blood_pressure"
            type="text"
            onChange={handleInputChange}
            value={formValues.blood_pressure}
          />
        </div>

        <div>
          <label htmlFor="hb_percentage" className="text-gray-700">
            HB Percentage
          </label>
          <Input
            id="hb_percentage"
            type="number"
            step="0.01"
            onChange={handleInputChange}
            value={formValues.hb_percentage}
          />
        </div>

        <div>
          <label htmlFor="pmtct_nutrition" className="text-gray-700 block">
            Infant Nutrition
          </label>
          <Select
            id="pmtct_nutrition"
            placeholder="Select PMTCT Nutrition"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="above_150">Exclusive Breastfeeding (EBF)</Option>
            <Option value="below_150">Replacement Feeding (RF)</Option>
          </Select>
        </div>
      </div>

      {/* Section 3: Breastfeeding */}
      <Divider orientation="left" className="text-lg font-semibold">
        Breastfeeding
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Breastfeeding */}
        <div>
          <label htmlFor="breastfeeding" className="text-gray-700 block">
            Is the child breastfeeding?
          </label>
          <Select
            id="breastfeeding"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="milk" className="text-gray-700 block">
            Is milk coming out?
          </label>
          <Select
            id="milk"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="started_within_hour" className="text-gray-700 block">
            Has the baby started breastfeeding within an hour?
          </label>
          <Select
            id="started_within_hour"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="sore_nipples" className="text-gray-700 block">
            Are the nipples sore?
          </label>
          <Select
            id="sore_nipples"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="too_full" className="text-gray-700 block">
            Are they too full?
          </label>
          <Select
            id="too_full"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="abscesses" className="text-gray-700 block">
            Are there any abscesses?
          </label>
          <Select
            id="abscesses"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="breastfeeding_advice" className="text-gray-700 block">
            Examine breastfeeding, provide advice
          </label>
          <textarea
            id="breastfeeding_advice"
            className="p-2 w-full border border-gray-300 rounded-lg bg-white"
            onChange={handleInputChange}
            value={formValues.breastfeeding_advice}
            rows={4}
            placeholder="Enter advice here..."
          ></textarea>
        </div>
      </div>

      {/* Section 4: Uterus */}
      <Divider orientation="left" className="text-lg font-semibold">
        Uterus
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Uterus */}
        <div>
          <label htmlFor="shrinking" className="text-gray-700 block">
            Is it shrinking?
          </label>
          <Select
            id="shrinking"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="in_pain" className="text-gray-700 block">
            Is it in pain?
          </label>
          <Select
            id="in_pain"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>
      </div>

      {/* Section 5: Incision / Surgical wound */}
      <Divider orientation="left" className="text-lg font-semibold">
        Incision / Surgical wound
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Incision / Surgical wound */}
        <div>
          <label htmlFor="incision_tear" className="text-gray-700 block">
            Incision: Did not tear?
          </label>
          <Select
            id="incision_tear"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="type_of_incision" className="text-gray-700 block">
            Type of Incision
          </label>
          <Select
            id="type_of_incision"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="tore">Tore</Option>
            <Option value="episiotomy_performed">Episiotomy performed</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="wound_healed" className="text-gray-700 block">
            Is the wound healed?
          </label>
          <Select
            id="wound_healed"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="pus" className="text-gray-700 block">
            Is there pus?
          </label>
          <Select
            id="pus"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="open_wound" className="text-gray-700 block">
            Is it open?
          </label>
          <Select
            id="open_wound"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="bad_smell" className="text-gray-700 block">
            Does it smell bad?
          </label>
          <Select
            id="bad_smell"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="lochia_amount" className="text-gray-700 block">
            Lochia amount
          </label>
          <Select
            id="lochia_amount"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="heavy">Heavy</Option>
            <Option value="moderate">Moderate</Option>
            <Option value="light">Light</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="lochia_color" className="text-gray-700">
            Lochia color
          </label>
          <Input
            id="lochia_color"
            onChange={handleInputChange}
            placeholder="Enter Lochia color..."
            value={formValues.lochia_color}
          />
        </div>
      </div>

      {/* Section 6: Mental State */}
      <Divider orientation="left" className="text-lg font-semibold">
        Mental State
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Mental State */}
        <div>
          <label htmlFor="mental_state" className="text-gray-700 block">
            Menatl State
          </label>
          <Select
            id="mental_state"
            placeholder="Select State"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Sick</Option>
            <Option value="no">Not sick</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="mental_issues" className="text-gray-700 block">
            Other Issues
          </label>
          <textarea
            id="mental_issues"
            className="p-2 w-full border border-gray-300 rounded-lg"
            onChange={handleInputChange}
            value={formValues.breastfeeding_advice}
            rows={1}
            placeholder="Enter aother mental issues here ..."
          ></textarea>
        </div>
      </div>

      {/* Section 7: Family Planning */}
      <Divider orientation="left" className="text-lg font-semibold">
        Family Planning
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Family Planning */}
        <div>
          <label htmlFor="advice_given" className="text-gray-700 block">
            Has Advice been given
          </label>
          <Select
            id="advice_given"
            placeholder="Select State"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>
      </div>

      {/* Section 8: Prophylactic Medications */}
      <Divider orientation="left" className="text-lg font-semibold">
        Prophylactic Medications
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Prophylactic Medications */}
        <div>
          <label htmlFor="ferrous_sulphate" className="text-gray-700 block">
            Ferrous Sulphate
          </label>
          <input
            id="ferrous_sulphate"
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="folic_acid" className="text-gray-700 block">
            Folic Acid
          </label>
          <input
            id="folic_acid"
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="tetanus_doses" className="text-gray-700 block">
            Tetanus Toxoid: How many doses has the patient received?
          </label>
          <Select
            id="tetanus_doses"
            placeholder="Select Option"
            className="w-full"
            onChange={handleInputChange}
          >
            <Option value="TT1">TT1</Option>
            <Option value="TT2">TT2</Option>
            <Option value="TT3">TT3</Option>
            <Option value="TT4">TT4</Option>
            <Option value="TT5">TT5</Option>
          </Select>
        </div>
      </div>

      {/* Section 9: Extra Information */}
      <Divider orientation="left" className="text-lg font-semibold">
        Extra Information
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Extra Information */}
        <div>
          <label htmlFor="pmtct_ctx" className="text-gray-700 block">
            PMTCT/CTX - If the mother is living with HIV
          </label>
          <Select
            id="pmtct_ctx"
            placeholder="Select Option"
            className="w-full"
            onChange={(value) =>
              setFormValues({ ...formValues, pmtct_ctx: value })
            }
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="postpartum_medications" className="text-gray-700">
            Postpartum Medications (ART)
          </label>
          <Input
            id="postpartum_medications"
            onChange={handleInputChange}
            value={formValues.postpartum_medications}
          />
        </div>

        <div>
          <label htmlFor="vitamin_a" className="text-gray-700 block">
            Vitamin A (Received/Not Received)
          </label>
          <Select
            id="vitamin_a"
            placeholder="Select Option"
            className="w-full"
            onChange={(value) =>
              setFormValues({ ...formValues, vitamin_a: value })
            }
          >
            <Option value="received">Received</Option>
            <Option value="not_received">Not Received</Option>
          </Select>
        </div>

        <div>
          <label htmlFor="date_of_next_visit" className="text-gray-700">
            Date of Next Visit
          </label>
          <Input
            id="date_of_next_visit"
            type="date"
            onChange={handleInputChange}
            value={formValues.date_of_next_visit}
          />
        </div>
      </div>

      {/* Section 10: Provider Information */}
      <Divider orientation="left" className="text-lg font-semibold">
        Provider Information
      </Divider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Inputs for Provider Information */}
        <div>
          <label htmlFor="provider_name" className="text-gray-700">
            Provider's Name
          </label>
          <Input
            id="provider_name"
            onChange={handleInputChange}
            value={formValues.provider_name}
          />
        </div>

        <div>
          <label htmlFor="provider_title" className="text-gray-700">
            Provider's Title
          </label>
          <Input
            id="provider_title"
            onChange={handleInputChange}
            value={formValues.provider_title}
          />
        </div>
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
    </section>
  );
};

export default ClinicVisitForm;
