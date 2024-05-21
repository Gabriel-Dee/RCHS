"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Input, Button, Select } from "antd";

const { Option } = Select;

const MotherDetailsForm: React.FC = () => {
  // State variables to store form values
  const [formValues, setFormValues] = useState({
    healthcare_centre_name: "",
    registration_number: "",
    mosquito_net_voucher_number: "",
    mother_name: "",
    mother_age: "",
    mother_education: "",
    mother_employment: "",
    Height: "",
    partner_name: "",
    partner_age: "",
    partner_work: "",
    partner_education: "",
    address: "",
    Chairperson_name: "",
    pregnancies: "",
    births: "",
    alive_children: "",
    miscarriages: "",
    miscarriage_age: "",
    miscarriage_year: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Handler for select change
  const handleSelectChange = (value: string) => {
    setFormValues({ ...formValues, Height: value });
  };

  // // Handler for form submission
  // const onFinish = async () => {
  //   try {
  //     console.log(formValues);

  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/mother/",
  //       formValues
  //     );
  //     console.log("Response:", response.data); // Log the response from the server
  //   } catch (error) {
  //     console.error("Error:", error); // Log any errors that occur during the request
  //   }
  // };

  // Handler for form submission
  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      console.log(formValues);

      const response = await axios.post(
        "http://127.0.0.1:8000/mother/",
        formValues
      );
      console.log("Response:", response.data); // Log the response from the server
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur during the request
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md border border-blue-400 min-w-full">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Mother(Parent/Guardian) Registration Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="healthcare_centre_name" className="text-gray-700">
              Healthcare Centre Name
            </label>
            <Input
              id="healthcare_centre_name"
              onChange={handleInputChange}
              value={formValues.healthcare_centre_name}
            />
          </div>

          <div>
            <label htmlFor="registration_number" className="text-gray-700">
              Registration Number
            </label>
            <Input
              id="registration_number"
              onChange={handleInputChange}
              value={formValues.registration_number}
              required
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
              onChange={handleInputChange}
              value={formValues.mosquito_net_voucher_number}
            />
          </div>

          <div>
            <label htmlFor="mother_name" className="text-gray-700">
              Mother's Name
            </label>
            <Input
              id="mother_name"
              onChange={handleInputChange}
              value={formValues.mother_name}
              required
            />
          </div>

          <div>
            <label htmlFor="mother_age" className="text-gray-700">
              Mother's Age
            </label>
            <Input
              id="mother_age"
              type="number"
              onChange={handleInputChange}
              value={formValues.mother_age}
            />
          </div>

          <div>
            <label htmlFor="mother_education" className="text-gray-700">
              Mother's Education
            </label>
            <Input
              id="mother_education"
              onChange={handleInputChange}
              value={formValues.mother_education}
            />
          </div>

          <div>
            <label htmlFor="mother_employment" className="text-gray-700">
              Work/Employment
            </label>
            <Input
              id="mother_employment"
              onChange={handleInputChange}
              value={formValues.mother_employment}
            />
          </div>

          <div>
            <label htmlFor="Height" className="text-gray-700 block">
              Height
            </label>
            <Select id="Height" placeholder="Select Height" className="w-full">
              <Option value="above_150">Above 150 cm</Option>
              <Option value="below_150">Below 150 cm</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="partner_name" className="text-gray-700">
              Husband's/Partner's/Companion's Name
            </label>
            <Input
              id="partner_name"
              onChange={handleInputChange}
              value={formValues.partner_name}
            />
          </div>

          <div>
            <label htmlFor="partner_age" className="text-gray-700">
              Husband's/Partner's/Companion's Age
            </label>
            <Input
              id="partner_age"
              type="number"
              onChange={handleInputChange}
              value={formValues.partner_age}
            />
          </div>

          <div>
            <label htmlFor="partner_work" className="text-gray-700">
              Husband's/Partner's/Companion's Work
            </label>
            <Input
              id="partner_work"
              onChange={handleInputChange}
              value={formValues.partner_work}
            />
          </div>

          <div>
            <label htmlFor="partner_education" className="text-gray-700">
              Husband's/Partner's/Companion's Education
            </label>
            <Input
              id="partner_education"
              onChange={handleInputChange}
              value={formValues.partner_education}
            />
          </div>

          <div>
            <label htmlFor="address" className="text-gray-700">
              Village/Street/Ward
            </label>
            <Input
              id="address"
              onChange={handleInputChange}
              value={formValues.address}
            />
          </div>

          <div>
            <label htmlFor="Chairperson_name" className="text-gray-700">
              Chairperson's Name
            </label>
            <Input
              id="Chairperson_name"
              onChange={handleInputChange}
              value={formValues.Chairperson_name}
            />
          </div>

          <div>
            <label htmlFor="pregnancies" className="text-gray-700">
              How many pregnancies
            </label>
            <Input
              id="pregnancies"
              type="number"
              onChange={handleInputChange}
              value={formValues.pregnancies}
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
            />
          </div>

          <div>
            <label htmlFor="miscarriage_age" className="text-gray-700">
              Miscarriage Age
            </label>
            <Input
              id="miscarriage_age"
              type="number"
              onChange={handleInputChange}
              value={formValues.miscarriage_age}
            />
          </div>

          <div>
            <label htmlFor="miscarriage_year" className="text-gray-700">
              Miscarriage Year
            </label>
            <Input
              id="miscarriage_year"
              type="number"
              onChange={handleInputChange}
              value={formValues.miscarriage_year}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {/* <Button
            type="primary"
            onClick={onFinish}
            htmlType="submit"
            className="bg-rchs"
          >
            Submit
          </Button> */}
          <Button
            type="primary"
            htmlType="submit"
            className="bg-rchs"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MotherDetailsForm;
