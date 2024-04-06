"use client"
import React from 'react';
import { Form, Input, Radio, Checkbox, Select, Divider, DatePicker, Button } from 'antd';

const { Option } = Select;

const ClinicVisitForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form name="clinic_visit" layout="vertical" onFinish={onFinish} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md min-w-full">
      {/* Visit Information */}
      <Divider orientation="left" className="text-lg font-semibold">Visit Information</Divider>
      <Form.Item name="visit_date" label="Visit Date" rules={[{ required: true, message: 'Please select visit date' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      {/* Health Measurements */}
      <Divider orientation="left" className="text-lg font-semibold">Health Measurements</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Body Temperature (°C)" name="body_temperature" rules={[{ required: true, message: 'Please input body temperature' }]}>
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item label="Blood Pressure (mmHg)" name="blood_pressure" rules={[{ required: true, message: 'Please input blood pressure' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="HB Percentage" name="hb_percentage" rules={[{ required: true, message: 'Please input HB percentage' }]}>
          <Input />
        </Form.Item>
      </div>
      {/* Add other health measurements here */}

      {/* Breastfeeding */}
      <Divider orientation="left" className="text-lg font-semibold">Breastfeeding</Divider>
      <Form.Item name="is_breastfeeding" label="Is the child breastfeeding?" rules={[{ required: true, message: 'Please select breastfeeding status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other breastfeeding-related questions here */}

      {/* Uterus */}
      <Divider orientation="left" className="text-lg font-semibold">Uterus</Divider>
      <Form.Item name="is_shrinking" label="Is it shrinking?" rules={[{ required: true, message: 'Please select uterus status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other uterus-related questions here */}

      {/* Incision / Surgical wound */}
      <Divider orientation="left" className="text-lg font-semibold">Incision / Surgical Wound</Divider>
      <Form.Item name="is_incision_healed" label="Is the wound healed?" rules={[{ required: true, message: 'Please select wound healing status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to incision / surgical wound here */}

      {/* Mental State */}
      <Divider orientation="left" className="text-lg font-semibold">Mental State</Divider>
      <Form.Item name="is_sick" label="Mental State" rules={[{ required: true, message: 'Please select mental state' }]}>
        <Radio.Group>
          <Radio value={true}>Sick</Radio>
          <Radio value={false}>Not Sick</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to mental state here */}

      {/* Family Planning */}
      <Divider orientation="left" className="text-lg font-semibold">Family Planning</Divider>
      <Form.Item name="family_planning_advice" label="Has advice been given?" rules={[{ required: true, message: 'Please select family planning advice' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to family planning here */}

      {/* Prophylactic Medications */}
      <Divider orientation="left" className="text-lg font-semibold">Prophylactic Medications</Divider>
      <Form.Item name="ferrous_sulphate" label="Ferrous Sulphate" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      {/* Add other prophylactic medications here */}

      {/* Provider Information */}
      <Divider orientation="left" className="text-lg font-semibold">Provider Information</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="provider_name" label="Provider's Name" rules={[{ required: true, message: 'Please input provider name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="provider_title" label="Provider's Title" rules={[{ required: true, message: 'Please input provider title' }]}>
          <Input />
        </Form.Item>
      </div>
      {/* Add other provider information here */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default ClinicVisitForm;
