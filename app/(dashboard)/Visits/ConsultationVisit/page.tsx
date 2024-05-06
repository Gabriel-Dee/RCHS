"use client";
import { useState } from "react";
import { Input, Button, Select, Divider } from "antd";
import axios from "axios";
import React from "react";

const { Option } = Select;

const ClinicVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    visit_date: "",
    visit_type: "",
    height: "",
    weight: "",
    temperature: "",
    other: "",
    test_results: "",
    additional_notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormValues({ ...formValues, visit_type: value });
  };

  const onFinish = async () => {
    try {
      console.log(formValues);
      const response = await axios.post(
        "http://127.0.0.1:8000/clinic-visit/",
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
        {/* Section 1: Visit Info */}
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
            <label htmlFor="visit_type" className="text-gray-700 block">
              Visit Type
            </label>
            <Select
              id="visit_type"
              placeholder="Select Visit Type"
              className="w-full"
              onChange={handleSelectChange}
            >
              <Option value="Consultation">Consultation</Option>
              <Option value="Vaccination">Vaccination</Option>
              <Option value="Checkup">Checkup</Option>
              <Option value="Emergency">Emergency</Option>
              {/* Add other common visit types here */}
            </Select>
          </div>
        </div>
        {/* Section 2: Measurements */}
        <Divider orientation="left" className="text-lg font-semibold">
          Measurements
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="height" className="text-gray-700">
              Height
            </label>
            <Input
              id="height"
              onChange={handleInputChange}
              value={formValues.height}
              placeholder="Enter Height"
            />
          </div>
          <div>
            <label htmlFor="weight" className="text-gray-700">
              Weight
            </label>
            <Input
              id="weight"
              onChange={handleInputChange}
              value={formValues.weight}
              placeholder="Enter Weight"
            />
          </div>
          <div>
            <label htmlFor="temperature" className="text-gray-700">
              Temperature
            </label>
            <Input
              id="temperature"
              onChange={handleInputChange}
              value={formValues.temperature}
              placeholder="Enter Temperature"
            />
          </div>
          <div>
            <label htmlFor="other" className="text-gray-700">
              Other
            </label>
            <Input
              id="other"
              onChange={handleInputChange}
              value={formValues.other}
              placeholder="Enter Other"
            />
          </div>
        </div>
        {/* Section 2: Results */}
        <Divider orientation="left" className="text-lg font-semibold">
          Test Results
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="test_results" className="text-gray-700">
              Test Results
            </label>
            <Input.TextArea
              id="test_results"
              rows={4}
              // onChange={handleInputChange}
              value={formValues.test_results}
              placeholder="Enter test results"
            />
          </div>

          <div>
            <label htmlFor="additional_notes" className="text-gray-700">
              Additional Notes
            </label>
            <Input.TextArea
              id="additional_notes"
              rows={4}
              // onChange={handleInputChange}
              value={formValues.additional_notes}
              placeholder="Enter any additional notes"
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
