"use client";
import { useState } from "react";
import { Input, Button, Select } from "antd";
import React from "react";

const { Option } = Select;

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
    place_of_birth: "",
    maternal_health_worker: "",
    child_residence: "",
  });

  // Handler for input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Handler for select change
  const handleSelectChange = (value: string) => {
    setFormValues({ ...formValues, child_gender: value });
  };

  // Handler for form submission
  const onFinish = async (e: any) => {
    try {
      e.preventDefault();
      console.log(formValues);

      const response = await fetch("http://127.0.0.1:8000/child/", {
        headers: {
          "Content-Type": "application/json", // Content type
        },
        body: JSON.stringify(formValues),
        method: "POST",
      });

      console.log("Response:", await response.json()); // Log the response from the server
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
              Mother's Name
            </label>
            <Input
              id="mother_name"
              onChange={handleInputChange}
              value={formValues.mother_name}
            />
          </div>

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
            <label htmlFor="child_number" className="text-gray-700">
              Child's Number
            </label>
            <Input
              id="child_number"
              onChange={handleInputChange}
              value={formValues.child_number}
            />
          </div>

          <div>
            <label htmlFor="child_name" className="text-gray-700">
              Child's Name
            </label>
            <Input
              id="child_name"
              onChange={handleInputChange}
              value={formValues.child_name}
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
              onChange={handleSelectChange}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
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
            />
          </div>

          <div>
            <label htmlFor="weight_at_birth" className="text-gray-700">
              Weight at Birth
            </label>
            <Input
              id="weight_at_birth"
              type="number"
              onChange={handleInputChange}
              value={formValues.weight_at_birth}
            />
          </div>

          <div>
            <label htmlFor="length_at_birth" className="text-gray-700">
              Length at Birth
            </label>
            <Input
              id="length_at_birth"
              type="number"
              onChange={handleInputChange}
              value={formValues.length_at_birth}
            />
          </div>

          <div>
            <label htmlFor="place_of_birth" className="text-gray-700">
              Place of Birth
            </label>
            <Input
              id="place_of_birth"
              onChange={handleInputChange}
              value={formValues.place_of_birth}
            />
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
              onChange={(value) =>
                setFormValues({ ...formValues, maternal_health_worker: value })
              }
            >
              <Option value="Healthcare Worker">Healthcare Worker</Option>
              <Option value="Traditional Birth Attendant (TBA)">
                Traditional Birth Attendant (TBA)
              </Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="child_residence" className="text-gray-700">
              Child's Residence
            </label>
            <Input
              id="child_residence"
              onChange={handleInputChange}
              value={formValues.child_residence}
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

export default ChildDetailsForm;