// components/IssueWorkOrder.tsx
import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { workOrderMeterChangeData } from "./mockData/workOrderMeterChangeData";
const { Option } = Select;

const IssueWorkOrder: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <h1>Issue Work Order</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        <Form.Item
          label="Account No"
          name="accountNo"
          rules={[{ required: true, message: "Account No is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Work Order Type"
          name="workOrderType"
          rules={[{ required: true, message: "Work Order Type is required" }]}
        >
          <Select>
            {workOrderMeterChangeData.workOrderTypes.map((type, index) => (
              <Option value={type} key={index}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Account Information */}
        <h2>Account Information</h2>
        {/* Similar fields like above for Account Information */}

        {/* Meter Information */}
        <h2>Meter Information</h2>
        {/* Similar fields like above for Meter Information */}

        {/* Work Order Information */}
        <h2>Work Order Information</h2>
        <Form.Item
          label="Schedule Start Date"
          name="startDate"
          rules={[{ required: true, message: "Start Date is required" }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        {/* ... Other fields */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default IssueWorkOrder;
