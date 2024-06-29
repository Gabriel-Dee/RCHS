import React from 'react';
import { Form, Input, Radio, Checkbox, Select, Divider, DatePicker, Button } from 'antd';

const { Option } = Select;

const ClinicVisitForm: React.FC = () => {
  const onFinish = (values: any) => {
  };

  return (
    <Form name="clinic_visit" layout="vertical" onFinish={onFinish}>
      {/* Visit Information */}
      <Divider orientation="left">Visit Information</Divider>
      <Form.Item name="visit_date" label="Visit Date" rules={[{ required: true, message: 'Please select visit date' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      {/* Health Measurements */}
      <Divider orientation="left">Health Measurements</Divider>
      <Form.Item label="Body Temperature (°C)" name="body_temperature" rules={[{ required: true, message: 'Please input body temperature' }]}>
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item label="Blood Pressure (mmHg)" name="blood_pressure" rules={[{ required: true, message: 'Please input blood pressure' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="HB Percentage" name="hb_percentage" rules={[{ required: true, message: 'Please input HB percentage' }]}>
        <Input />
      </Form.Item>
      {/* Add other health measurements here */}

      {/* Breastfeeding */}
      <Divider orientation="left">Breastfeeding</Divider>
      <Form.Item name="is_breastfeeding" label="Is the child breastfeeding?" rules={[{ required: true, message: 'Please select breastfeeding status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other breastfeeding-related questions here */}

      {/* Uterus */}
      <Divider orientation="left">Uterus</Divider>
      <Form.Item name="is_shrinking" label="Is it shrinking?" rules={[{ required: true, message: 'Please select uterus status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other uterus-related questions here */}

      {/* Incision / Surgical wound */}
      <Divider orientation="left">Incision / Surgical Wound</Divider>
      <Form.Item name="is_incision_healed" label="Is the wound healed?" rules={[{ required: true, message: 'Please select wound healing status' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to incision / surgical wound here */}

      {/* Mental State */}
      <Divider orientation="left">Mental State</Divider>
      <Form.Item name="is_sick" label="Mental State" rules={[{ required: true, message: 'Please select mental state' }]}>
        <Radio.Group>
          <Radio value={true}>Sick</Radio>
          <Radio value={false}>Not Sick</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to mental state here */}

      {/* Family Planning */}
      <Divider orientation="left">Family Planning</Divider>
      <Form.Item name="family_planning_advice" label="Has advice been given?" rules={[{ required: true, message: 'Please select family planning advice' }]}>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      {/* Add other questions related to family planning here */}

      {/* Prophylactic Medications */}
      <Divider orientation="left">Prophylactic Medications</Divider>
      <Form.Item name="ferrous_sulphate" label="Ferrous Sulphate" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      {/* Add other prophylactic medications here */}

      {/* Provider Information */}
      <Divider orientation="left">Provider Information</Divider>
      <Form.Item name="provider_name" label="Provider's Name" rules={[{ required: true, message: 'Please input provider name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="provider_title" label="Provider's Title" rules={[{ required: true, message: 'Please input provider title' }]}>
        <Input />
      </Form.Item>
      {/* Add other provider information here */}

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default ClinicVisitForm;
