import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import RealType from "../../../customComponents/RealTimeTextDisplay/RealType";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";
const { Option } = Select;

interface Theme {
  [key: string]: string;
}

interface IssueWorkOrderProps {
  theme?: Theme;
}

const IssueWorkOrder: React.FC<IssueWorkOrderProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
    // Add logic to apply the filter and fetch data here
  };

  const handleReset = () => {
    // Reset the form and clear the filter
    form.resetFields();
  };

  const handleWorkOrderSelect = (selectedWorkOrder: {
    code: string;
    description: string;
  }) => {
    // Implement logic for handling work order selection
    console.log(`Selected work order code: ${selectedWorkOrder.code}`);
    console.log(
      `Selected work order description: ${selectedWorkOrder.description}`
    );

    // Call both setWorkOrderType and setWorkOrderDescription
    setWorkOrderType(selectedWorkOrder.code);
    setWorkOrderDescription(selectedWorkOrder.description);
  };

  return (
    <div style={{ marginLeft: 24 }}>
      <h1>Issue Work Order</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        {/* Work Order Type */}
        <Form.Item
          label="Work Order Type"
          name="workOrderType"
          rules={[{ required: true, message: "Missing Work Order Type" }]}
        >
          <WorkOrderTypeSelection
            onSelect={handleWorkOrderSelect} // Use the callback directly
            theme={{ cyan: "#00a991" }}
          />
        </Form.Item>
        {/* Account Number */}
        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[{ required: true, message: "Missing Account Number" }]}
        >
          <Input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Form.Item>
        {/* RealType for real-time text display */}
        <RealType
          primaryText={workOrderType}
          secondaryText={workOrderDescription}
          additionalText={accountNumber}
        />{" "}
      </Form>
    </div>
  );
};

export default IssueWorkOrder;
