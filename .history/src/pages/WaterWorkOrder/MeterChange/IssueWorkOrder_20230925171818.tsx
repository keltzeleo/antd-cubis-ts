import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
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

  const handleWorkOrderSelect = (selectedWorkOrder: string) => {
    // Implement logic for handling work order selection
    console.log(`Selected work order code: ${selectedWorkOrder}`);
  };

  return (
    <div style={{ marginLeft: 24 }}>
      <h1>Issue Work Order</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        <h2>Filtering Entry</h2>
        <Row gutter={16}>
          <Col span={3}>
            <Form.Item
              label="Work Order Type"
              name="workOrderType"
              rules={[{ required: true, message: "Missing Work Order Type" }]}
            >
              <WorkOrderTypeSelection
                onSelect={handleWorkOrderSelect}
                theme={{ cyan: "#00a991" }}
              />
            </Form.Item>
          </Col>
          <Col span={}>
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[{ required: true, message: "Missing Account Number" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>

        {/* Fields for Account Information, Meter Information, and Work Order Information here */}

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
      </Form>
    </div>
  );
};

export default IssueWorkOrder;
