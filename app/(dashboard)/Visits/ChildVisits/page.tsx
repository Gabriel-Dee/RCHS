"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Divider, Select } from "antd";
import NotificationModal from "@/app/components/NotificationModal";

const { Option } = Select;

const publicHolidays = [
  "2024-01-01",
  "2024-07-04",
  "2024-12-25",
  // add more holidays as needed
];

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

const calculateNextVisitDate = (
  currentVisitDate: string | number | Date,
  visitPhase: string,
  visitNumber: string,
  publicHolidays: string[]
): string => {
  const currentVisit = new Date(currentVisitDate);
  let nextVisit = new Date(currentVisitDate);

  if (visitPhase === "Before Card") {
    if (visitNumber === "First") {
      nextVisit.setDate(currentVisit.getDate() + 7);
    } else if (visitNumber === "Second") {
      nextVisit.setDate(currentVisit.getDate() + 28);
    } else if (visitNumber === "Third") {
      nextVisit.setDate(currentVisit.getDate() + 42);
    }
  } else if (visitPhase === "After Card") {
    nextVisit.setMonth(currentVisit.getMonth() + 1);
  }

  while (
    nextVisit.getDay() === 0 ||
    nextVisit.getDay() === 6 ||
    publicHolidays.includes(nextVisit.toISOString().split("T")[0])
  ) {
    nextVisit.setDate(nextVisit.getDate() + 1);
  }

  return nextVisit.toISOString().split("T")[0];
};

const ChildVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    child_name: "",
    visit_number: "",
    visit_phase: "",
    date: "",
    return_date: "",
    vitamin_a: "",
    deworming_medication: "",
    weight_grams: "",
    height: "",
    anemia: "",
    body_temperature: "",
    infant_nutrition: "",
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
    hb_percentage: "",
    bmi: "",
  });

  const [children, setChildren] = useState<Child[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetch Child list from the server
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/child/");
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

  const calculateBMI = (weight: number, height: number): number => {
    if (weight > 0 && height > 0) {
      return (weight / (height * height)) * 10000;
    }
    return 0;
  };

  // Update BMI whenever weight or height changes
  useEffect(() => {
    const weight = parseFloat(formValues.weight_grams);
    const height = parseFloat(formValues.height);
    const bmi = calculateBMI(weight, height);
    setFormValues((prevValues) => ({
      ...prevValues,
      bmi: bmi.toFixed(2),
    }));
  }, [formValues.weight_grams, formValues.height]);

  useEffect(() => {
    if (formValues.date && formValues.visit_phase && formValues.visit_number) {
      const nextVisitDate = calculateNextVisitDate(
        formValues.date,
        formValues.visit_phase,
        formValues.visit_number,
        publicHolidays // Add this line to pass the publicHolidays array
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        return_date: nextVisitDate,
      }));
    }
  }, [formValues.date, formValues.visit_phase, formValues.visit_number]);
  

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
      "visit_number",
      "visit_phase",
      "date",
      "return_date",
      "vitamin_a",
      "deworming_medication",
      "weight_grams",
      "height",
      "anemia",
      "body_temperature",
      "infant_nutrition",
      "unable_to_breastfeed",
      "child_play",
      "eyes",
      "mouth",
      "ears",
      "navel_healed",
      "navel_red",
      "navel_discharge_odor",
      "has_pus_filled_bumps",
      "has_turned_yellow",
      "received_bcg",
      "received_polio_0",
      "received_polio_1",
      "received_dtp_hep_hib",
      "received_pneumococcal",
      "received_rota",
      "name_of_attendant",
      "attendant_title",
      "hb_percentage",
      "bmi",
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

    if (+formValues.weight_grams < MIN_WEIGHT_KG) {
      setModalMessage(`Weight should be at least ${MIN_WEIGHT_KG} kg.`);
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/child_visit/", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        method: "POST",
      });

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
            <label htmlFor="visit_phase" className="text-gray-700 block">
              Visit Phase
            </label>
            <Select
              id="visit_phase"
              placeholder="Select Visit Phase"
              className="w-full"
              onChange={(value) =>
                setFormValues({ ...formValues, visit_phase: value })
              }
              value={formValues.visit_phase}
            >
              <Option value="Before Card">Before Card</Option>
              <Option value="After Card">After Card</Option>
            </Select>
          </div>

          {formValues.visit_phase === "Before Card" ? (
            <div>
              <label htmlFor="visit_number" className="text-gray-700">
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
                <Option value="First">First (within 48 hrs)</Option>
                <Option value="Second">Second (within 7 days)</Option>
                <Option value="Third">Third (in 28 days)</Option>
                <Option value="Fourth">Fourth (in 42 days)</Option>
              </Select>
            </div>
          ) : (
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
          )}
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
        </div>
        <Divider orientation="left" className="text-lg font-semibold">
          Child's Measurements and Health Indicators
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="weight_grams" className="text-gray-700">
              Weight (Kgs)
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

          <div>
            <label htmlFor="hb_percentage" className="text-gray-700">
              HB (Percentage)
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
            <label htmlFor="anemia" className="text-gray-700">
              Anemia (Hb or paleness of the palms)
            </label>
            <Input
              id="anemia"
              onChange={handleInputChange}
              value={formValues.anemia}
            />
          </div>

          <div>
            <label htmlFor="bmi" className="text-gray-700">
              BMI
            </label>
            <Input
              id="bmi"
              type="number"
              step="0.01"
              onChange={handleInputChange}
              value={formValues.bmi}
            />
          </div>
        </div>

        <Divider orientation="left" className="text-lg font-semibold">
          Child's Nutrition
        </Divider>
        <div>
          <label htmlFor="infant_nutrition" className="text-gray-700 block">
            Infant Nutrition
          </label>
          <Select
            id="infant_nutrition"
            placeholder="Select PMTCT Nutrition"
            className="w-full"
            onChange={(value) => handleSelectChange("infant_nutrition", value)}
            value={formValues.infant_nutrition}
          >
            <Option value="Exclusive Breastfeeding (EBF)">
              Exclusive Breastfeeding (EBF)
            </Option>
            <Option value="Replacement Feeding (RF)">
              Replacement Feeding (RF)
            </Option>
            <Option value="Complementary Feeding (CF)">
              Complementary Feeding (CF)
            </Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Unable to Breastfeed */}
          <div>
            <label htmlFor="unable_to_breastfeed" className="text-gray-700">
              Unable to Breastfeed
            </label>
            <Select
              id="unable_to_breastfeed"
              placeholder="Select"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("unable_to_breastfeed", value)
              }
              value={formValues.unable_to_breastfeed}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Child Play */}
          <div>
            <label htmlFor="child_play" className="text-gray-700">
              Child Reflex/Activity
            </label>
            <Select
              id="child_play"
              placeholder="Select"
              className="w-full"
              onChange={(value) => handleSelectChange("child_play", value)}
              value={formValues.child_play}
            >
              <Option value="Active">Active</Option>
              <Option value="Not Active">Not Active</Option>
            </Select>
          </div>
        </div>

        {/* Section 2: Child Checkup */}
        <Divider orientation="left" className="text-lg font-semibold">
          Child Checkup
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Eyes */}
          <div>
            <label htmlFor="eyes" className="text-gray-700">
              Do the eyes have any discharge?
            </label>
            <Select
              id="eyes"
              placeholder="Select"
              className="w-full"
              onChange={(value) => handleSelectChange("eyes", value)}
              value={formValues.eyes}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Mouth */}
          <div>
            <label htmlFor="mouth" className="text-gray-700">
              Does the mouth have White coating?
            </label>
            <Select
              id="mouth"
              placeholder="Select"
              className="w-full"
              onChange={(value) => handleSelectChange("mouth", value)}
              value={formValues.mouth}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Ears */}
          <div>
            <label htmlFor="ears" className="text-gray-700">
              Do the ears have any Discharge?
            </label>
            <Select
              id="ears"
              placeholder="Select"
              className="w-full"
              onChange={(value) => handleSelectChange("ears", value)}
              value={formValues.ears}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Navel Healed */}
          <div>
            <label htmlFor="navel_healed" className="text-gray-700">
              Is the navel Healed?
            </label>
            <Select
              id="navel_healed"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("navel_healed", value)}
              value={formValues.navel_healed}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Navel Red */}
          <div>
            <label htmlFor="navel_red" className="text-gray-700">
              Is the navel Red?
            </label>
            <Select
              id="navel_red"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("navel_red", value)}
              value={formValues.navel_red}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Navel Discharge Odor */}
          <div>
            <label htmlFor="navel_discharge_odor" className="text-gray-700">
              Does the navel discharge Odor?
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Has pus-filled bumps */}
          <div>
            <label htmlFor="has_pus_filled_bumps" className="text-gray-700">
              Does the skin have Pus-filled Bumps?
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Has turned yellow */}
          <div>
            <label htmlFor="has_turned_yellow" className="text-gray-700">
              Has the skin turned Yellow?
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>
        </div>

        <Divider orientation="left" className="text-lg font-semibold">
          Vaccinations And Medications
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Received BCG */}
          <div>
            <label htmlFor="received_bcg" className="text-gray-700">
              Received BCG Tuberculosis Injection (Right Shoulder)
            </label>
            <Select
              id="received_bcg"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("received_bcg", value)}
              value={formValues.received_bcg}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
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
              <Option value="No">No</Option>
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
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
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          {/* Vitamin A */}
          <div>
            <label htmlFor="vitamin_a" className="text-gray-700">
              Vitamin A
            </label>
            <Select
              id="vitamin_a"
              placeholder="Select"
              className="w-full"
              onChange={(value) => handleSelectChange("vitamin_a", value)}
              value={formValues.vitamin_a}
            >
              <Option value="Taken">Taken</Option>
              <Option value="Not Taken">Not Taken</Option>
            </Select>
          </div>

          {/* Deworming Medication */}
          <div>
            <label htmlFor="deworming_medication" className="text-gray-700">
              Deworming Medication
            </label>
            <Select
              id="deworming_medication"
              placeholder="Select"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("deworming_medication", value)
              }
              value={formValues.deworming_medication}
            >
              <Option value="Taken">Taken</Option>
              <Option value="Not Taken">Not Taken</Option>
            </Select>
          </div>
        </div>
        <Divider orientation="left" className="text-lg font-semibold">
          Attendant's Information
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              Attendant's Title
            </label>
            <Select
              id="attendant_title"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("attendant_title", value)}
              value={formValues.attendant_title}
            >
              <Option value="Healthcare Worker">Healthcare Worker</Option>
              <Option value="Traditional Birth Attendant (TBA)">
                Traditional Birth Attendant (TBA)
              </Option>
              <Option value="Others">Others</Option>
            </Select>
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
      {modalVisible && (
        <NotificationModal
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      )}
    </section>
  );
};

export default ChildVisitForm;
