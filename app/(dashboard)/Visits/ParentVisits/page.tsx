"use client";
import { useEffect, useState } from "react";
import { Input, Button, Select, Divider } from "antd";
import React from "react";
import NotificationModal from "@/app/components/NotificationModal";

const { Option } = Select;

const publicHolidays = [
  "2024-01-01",
  "2024-07-04",
  "2024-12-25",
  // add more holidays as needed
];

interface Mother {
  url: string;
  id: string;
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

const calculateNextVisitDate = (
  currentVisitDate: string | number | Date,
  visitNumber: string,
  publicHolidays: string[]
): string => {
  const currentVisit = new Date(currentVisitDate);
  let nextVisit = new Date(currentVisitDate);

  if (visitNumber === "First") {
    nextVisit.setDate(currentVisit.getDate() + 7);
  } else if (visitNumber === "Second") {
    nextVisit.setDate(currentVisit.getDate() + 28);
  } else if (visitNumber === "Third") {
    nextVisit.setDate(currentVisit.getDate() + 42);
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

const ClinicVisitForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    // Section 1: Visit Information
    visit_date: "",
    visit_number: "",
    mother_name: "",
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

  const [mothers, setMothers] = useState<Mother[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fetch mothers list from the server
  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await fetch("http://100.42.178.17:8800/mother/");
        const data = await response.json();
        setMothers(data);
      } catch (error) {
        console.error("Error fetching mothers:", error);
      }
    };

    fetchMothers();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  useEffect(() => {
    if (formValues.visit_date && formValues.visit_number) {
      const nextVisitDate = calculateNextVisitDate(
        formValues.visit_date,
        formValues.visit_number,
        publicHolidays
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        date_of_next_visit: nextVisitDate,
      }));
    }
  }, [formValues.visit_date, formValues.visit_number])

  const handleSelectChange = (id: string, value: string) => {
    setFormValues({ ...formValues, [id]: value });
  };

  // Specific handlers for select changes
  const handleMotherNameChange = (value: string) => {
    setFormValues({ ...formValues, mother_name: value });
  };

  // Handler for form submission
  const onFinish = async (e: any) => {
    e.preventDefault();

    const requiredFields = [
      // Section 1: Visit Information
      "visit_date",
      "visit_number",
      "mother_name",
      // Section 2: Health Measurements
      "body_temperature",
      "blood_pressure",
      "hb_percentage",
      "pmtct_nutrition",
      // Section 3: Breastfeeding
      "breastfeeding",
      "milk_coming_out",
      "breastfeeding_within_hour",
      "sore_nipples",
      "full_nipples",
      "abscesses",
      "breastfeeding_advice",
      // Section 4: Uterus
      "uterus_shrinking",
      "uterus_pain",
      // Section 5: Incision / Surgical wound
      "incision_type",
      "wound_healed",
      "pus",
      "wound_open",
      "bad_smell",
      "lochia_amount",
      "lochia_color",
      // Section 6: Mental State
      "mental_state",
      "mental_issues",
      // Section 7: Family Planning
      "advice_given",
      // Section 8: Prophylactic Medications
      "ferrous_sulphate",
      "folic_acid",
      "tetanus_toxoid_doses",
      // Section 9: Provider Information
      "pmtct_ctx",
      "postpartum_medications",
      "vitamin_a",
      "date_of_next_visit",
      "provider_name",
      "provider_title",
    ];

    for (const field of requiredFields) {
      if (!formValues[field as keyof typeof formValues]) {
        setModalMessage(`Please fill the ${field.replace("_", " ")} field.`);
        setModalVisible(true);
        return;
      }
    }

    try {
      const response = await fetch("http://100.42.178.17:8800/mother_visit/", {
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
        Parent Visit Form
      </h2>
      <form onSubmit={onFinish} className="mt-4 space-y-6">
        {/* Section 1: Visit Information */}
        <Divider orientation="left" className="text-lg font-semibold">
          Visit Information
        </Divider>
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
              <Option value="First">First (within 48 hrs)</Option>
              <Option value="Second">Second (within 7 days)</Option>
              <Option value="Third">Third (in 28 days)</Option>
              <Option value="Fourth">Fourth (in 42 days)</Option>
            </Select>
          </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* <div>
            <label htmlFor="visit_date" className="text-gray-700">
              Visit Date
            </label>
            <Input
              id="visit_date"
              type="date"
              onChange={handleInputChange}
              value={formValues.visit_date}
            />
          </div> */}

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
            <label htmlFor="date_of_next_visit" className="text-gray-700">
              Return Date
            </label>
            <Input
              id="date_of_next_visit"
              type="date"
              onChange={handleInputChange}
              value={formValues.date_of_next_visit}
            />
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
              type="number"
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
              onChange={(value) => handleSelectChange("pmtct_nutrition", value)}
              value={formValues.pmtct_nutrition}
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
              placeholder="Select Breastfeeding Behaviour"
              className="w-full"
              onChange={(value) => handleSelectChange("breastfeeding", value)}
              value={formValues.breastfeeding}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="milk_coming_out" className="text-gray-700 block">
              Is milk coming out?
            </label>
            <Select
              id="milk_coming_out"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("milk_coming_out", value)}
              value={formValues.milk_coming_out}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label
              htmlFor="breastfeeding_within_hour"
              className="text-gray-700 block"
            >
              Has the baby started breastfed within an hour?
            </label>
            <Select
              id="breastfeeding_within_hour"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("breastfeeding_within_hour", value)
              }
              value={formValues.breastfeeding_within_hour}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="sore_nipples" className="text-gray-700 block">
              Are the nipples sore?
            </label>
            <Select
              id="sore_nipples"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("sore_nipples", value)}
              value={formValues.sore_nipples}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="full_nipples" className="text-gray-700 block">
              Are they too full?
            </label>
            <Select
              id="full_nipples"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("full_nipples", value)}
              value={formValues.full_nipples}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="abscesses" className="text-gray-700 block">
              Are there any abscesses?
            </label>
            <Select
              id="abscesses"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("abscesses", value)}
              value={formValues.abscesses}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>
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

        {/* Section 4: Uterus */}
        <Divider orientation="left" className="text-lg font-semibold">
          Uterus
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Inputs for Uterus */}

          <div>
            <label htmlFor="uterus_shrinking" className="text-gray-700 block">
              Is it shrinking?
            </label>
            <Select
              id="uterus_shrinking"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) =>
                handleSelectChange("uterus_shrinking", value)
              }
              value={formValues.uterus_shrinking}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="uterus_pain" className="text-gray-700 block">
              Is it in pain?
            </label>
            <Select
              id="uterus_pain"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("uterus_pain", value)}
              value={formValues.uterus_pain}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>
        </div>

        {/* Section 5: Incision / Surgical wound */}
        <Divider orientation="left" className="text-lg font-semibold">
          Incision / Surgical wound
        </Divider>
        <div>
          <label htmlFor="incision_type" className="text-gray-700 block">
            Type of Incision
          </label>
          <Select
            id="incision_type"
            placeholder="Select Answer"
            className="w-full"
            onChange={(value) => handleSelectChange("incision_type", value)}
            value={formValues.incision_type}
          >
            <Option value="Tear">Tear</Option>
            <Option value="Episiotomy">Episiotomy</Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Inputs for Incision / Surgical wound */}

          <div>
            <label htmlFor="wound_healed" className="text-gray-700 block">
              Is the wound healed?
            </label>
            <Select
              id="wound_healed"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("wound_healed", value)}
              value={formValues.wound_healed}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="pus" className="text-gray-700 block">
              Is there pus?
            </label>
            <Select
              id="pus"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("pus", value)}
              value={formValues.pus}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="wound_open" className="text-gray-700 block">
              Is it open?
            </label>
            <Select
              id="wound_open"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("wound_open", value)}
              value={formValues.wound_open}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="bad_smell" className="text-gray-700 block">
              Does it smell bad?
            </label>
            <Select
              id="bad_smell"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("bad_smell", value)}
              value={formValues.bad_smell}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="lochia_amount" className="text-gray-700 block">
              Lochia amount
            </label>
            <Select
              id="lochia_amount"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("lochia_amount", value)}
              value={formValues.lochia_amount}
            >
              <Option value="Much">Much</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Little">Little</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="lochia_color" className="text-gray-700">
              Lochia color
            </label>
            <Select
              id="lochia_color"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("lochia_color", value)}
              value={formValues.lochia_color}
            >
              <Option value="Rubra - Red">Rubra - Red</Option>
              <Option value="Serosa - Yellowish">Serosa - Yellowish</Option>
              <Option value="Alba - White">Alba - White</Option>
            </Select>
          </div>
        </div>

        {/* Section 6: Mental State */}
        <Divider orientation="left" className="text-lg font-semibold">
          Mental State
        </Divider>
        {/* Inputs for Mental State */}
        <div>
          <label htmlFor="mental_state" className="text-gray-700 block">
            Mental State
          </label>
          <Select
            id="mental_state"
            placeholder="Select Answer"
            className="w-full"
            onChange={(value) => handleSelectChange("mental_state", value)}
            value={formValues.mental_state}
          >
            <Option value="Sick">Sick</Option>
            <Option value="Not Sick">Not sick</Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"></div>
        <div>
          <label htmlFor="mental_issues" className="text-gray-700 block">
            Other Issues
          </label>
          <textarea
            id="mental_issues"
            className="p-2 w-full border border-gray-300 rounded-lg bg-white"
            onChange={handleInputChange}
            value={formValues.mental_issues}
            rows={4}
            placeholder="Enter advice here..."
          ></textarea>
        </div>

        {/* Section 7: Family Planning */}
        <Divider orientation="left" className="text-lg font-semibold">
          Family Planning
        </Divider>
        {/* Inputs for Family Planning */}
        <div>
          <label htmlFor="advice_given" className="text-gray-700 block">
            Has Advice been given
          </label>
          <Select
            id="advice_given"
            placeholder="Select Answer"
            className="w-full"
            onChange={(value) => handleSelectChange("advice_given", value)}
            value={formValues.advice_given}
          >
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
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
        </div>
        <div>
          <label htmlFor="tetanus_toxoid_doses" className="text-gray-700 block">
            Tetanus Toxoid: How many doses has the patient received?
          </label>
          <Select
            id="tetanus_toxoid_doses"
            placeholder="Select Answer"
            className="w-full"
            onChange={(value) =>
              handleSelectChange("tetanus_toxoid_doses", value)
            }
            value={formValues.tetanus_toxoid_doses}
          >
            <Option value="TT1">TT1</Option>
            <Option value="TT2">TT2</Option>
            <Option value="TT3">TT3</Option>
            <Option value="TT4">TT4</Option>
            <Option value="TT5">TT5</Option>
          </Select>
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
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("pmtct_ctx", value)}
              value={formValues.pmtct_ctx}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
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
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("vitamin_a", value)}
              value={formValues.vitamin_a}
            >
              <Option value="Received">Received</Option>
              <Option value="Not received">Not Received</Option>
            </Select>
          </div>

          {/* <div>
            <label htmlFor="date_of_next_visit" className="text-gray-700">
              Date of Next Visit
            </label>
            <Input
              id="date_of_next_visit"
              type="date"
              onChange={handleInputChange}
              value={formValues.date_of_next_visit}
            />
          </div> */}
        </div>

        {/* Section 10: Provider Information */}
        <Divider orientation="left" className="text-lg font-semibold">
          Attendant's Information
        </Divider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Inputs for Provider Information */}
          <div>
            <label htmlFor="provider_name" className="text-gray-700">
              Attendant's Name
            </label>
            <Input
              id="provider_name"
              onChange={handleInputChange}
              value={formValues.provider_name}
            />
          </div>

          <div>
            <label htmlFor="provider_title" className="text-gray-700">
              Attendant's Title
            </label>
            <Select
              id="provider_title"
              placeholder="Select Answer"
              className="w-full"
              onChange={(value) => handleSelectChange("provider_title", value)}
              value={formValues.provider_title}
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
