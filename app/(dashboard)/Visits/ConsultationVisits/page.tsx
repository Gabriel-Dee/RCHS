"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Select, Divider } from "antd";
import NotificationModal from "@/app/components/NotificationModal";

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

const ClinicVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    child_name: "",
    date: "",
    visit_type: "",
    height: "",
    weight: "",
    temperature: "",
    other: "",
    test_results: "",
    additional_notes: "",
  });

  const [children, setChildren] = useState<Child[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetch Child list from the server
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("http://rchsbackend:8800/child/");
        const data = await response.json();
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

  const MIN_HEIGHT_CM = 48; // Minimum height in cm
  const MIN_WEIGHT_KG = 2.5; // Minimum weight in kg

  // Handler for form submission
  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "child_name",
      "date",
      "visit_type",
      "height",
      "weight",
      "temperature",
      "other",
      "test_results",
      "additional_notes",
    ];

    for (const field of requiredFields) {
      if (!formValues[field as keyof typeof formValues]) {
        setModalMessage(`Please fill the ${field.replace("_", " ")} field.`);
        setModalVisible(true);
        return;
      }
    }

    // Perform validation for height and weight
    if (+formValues.height < MIN_HEIGHT_CM) {
      setModalMessage(`Height should be at least ${MIN_HEIGHT_CM} cm.`);
      setModalVisible(true);
      return;
    }

    if (+formValues.weight < MIN_WEIGHT_KG) {
      setModalMessage(`Weight should be at least ${MIN_WEIGHT_KG} kg.`);
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(
        "http://rchsbackend:8800/child_consult_visit/",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
          method: "POST",
        }
      );

      const data = await response.json();
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
        Consultation Visit Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        {/* Section 1: Visit Info */}
        <Divider orientation="left" className="text-lg font-semibold">
          Visit Information
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
            <label htmlFor="visit_type" className="text-gray-700 block">
              Visit Type
            </label>
            <Select
              id="visit_type"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("visit_type", value)}
              value={formValues.visit_type}
            >
              <Option value="Consultation">Consultation</Option>
              <Option value="Vaccination">Vaccination</Option>
              <Option value="Checkup">Checkup</Option>
              <Option value="Emergency">Emergency</Option>
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
            <textarea
              id="test_results"
              className="p-2 w-full border border-gray-300 rounded-lg bg-white"
              onChange={handleInputChange}
              value={formValues.test_results}
              rows={4}
              placeholder="Enter Test Results"
            ></textarea>
          </div>

          <div>
            <label htmlFor="additional_notes" className="text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="additional_notes"
              className="p-2 w-full border border-gray-300 rounded-lg bg-white"
              onChange={handleInputChange}
              value={formValues.additional_notes}
              rows={4}
              placeholder="Enter any additional notes"
            ></textarea>
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

export default ClinicVisitForm;
