import { Button, DatePicker, Form, Select } from "antd";
import React from "react";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";

const { Option } = Select;

interface Theme {
  [key: string]: string;
}

interface IssueWorkOrderProps {
  theme?: Theme;
}

const IssueWorkOrder: React.FC<IssueWorkOrderProps> = ({ theme }) => {
  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
  };

  const handleWorkOrderSelect = (selectedWorkOrder: string) => {
    // Implement logic for handling work order selection
    console.log(`Selected work order code: ${selectedWorkOrder}`);
  };

  return (
    <div style={{ marginLeft: 24 }}>
      <h1>Issue Work Order</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        <WorkOrderTypeSelection
          onSelect={handleWorkOrderSelect}
          theme={{ cyan: "cyan.6" }}
        />

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
