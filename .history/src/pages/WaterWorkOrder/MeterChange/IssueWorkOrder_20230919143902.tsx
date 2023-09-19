import { Button, DatePicker, Form, Select } from "antd";
import React from "react";
const { Option } = Select;

const IssueWorkOrder: React.FC = () => {
  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
  };

  return (
    <div>
      <h1>Issue Work Order</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        {/* Fields for Account No and Work Order Type */}
        {/* Add similar fields for Account Information, Meter Information, and Work Order Information here */}

        {/* Work Order Information */}
        <h2>Work Order Information</h2>
        <Form.Item
          label="Schedule Start Date"
          name="startDate"
          rules={[{ required: true, message: "Start Date is required" }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        {/* Add other fields for Work Order Information here */}

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
