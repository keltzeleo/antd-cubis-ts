import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
} from "antd";
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
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(""); // Initialize with an empty string

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
        <h2>Filtering Entry</h2>
        <Row gutter={16}>
          <Col style={{ width: 220 }}>
            <Form.Item
              label="Work Order Type"
              name="workOrderType"
              rules={[{ required: true, message: "Missing Work Order Type" }]}
            >
              <WorkOrderTypeSelection
                onSelect={(selectedWorkOrder, description) => {
                  setSelectedWorkOrder(selectedWorkOrder);
                  setWorkOrderDescription(description);
                }}
                theme={{ cyan: "#00a991" }}
              />
            </Form.Item>
          </Col>
          <Col style={{ width: 260 }}>
            {/* Account Number */}

            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[{ required: true, message: "Missing Account Number" }]}
            >
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  // Use a regular expression to remove non-digit characters
                  const sanitizedValue = e.target.value.replace(/\D/g, "");
                  setAccountNumber(sanitizedValue);
                }}
              />
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
        {/* Alert Message */}
        <Row style={{ marginTop: "-18px", marginBottom: "12px" }}>
          <Col span={24}>
            {accountNumber.length === 0 && (
              <Alert
                message="Account Number Required"
                description="Please enter a valid account number to proceed."
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            )}
          </Col>
        </Row>
        {/* RealType for real-time text display */}
        <RealType
          primaryText={workOrderType}
          secondaryText={workOrderDescription}
          additionalText={accountNumber}
        />{" "}
        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={4}>
            {/* Customer Information */}
            <h3> Account Information</h3>
            <div
              style={{
                height: "auto",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: 16,
                borderRadius: 8,
                textAlign: "left", // Align the content inside the scrollable div to the left
              }}
            >
              <Form
                layout="vertical"
                style={{
                  textAlign: "left", // Align the content inside the scrollable div to the left
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <span
                        style={{
                          background: theme? theme["cyan"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          fontWeight: "bold",
                        }}
                      >
                        John Doe
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Status">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        Active
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Consumer Type">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        Individual
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tariff">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        Residential
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Book No">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        12345
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Type">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        Regular
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Arrears">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "4px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        $100.00
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Address">
                      <span
                        style={{
                          background: "cyan.1",
                          padding: "px, 16px",
                          fontWeight: "bold",
                        }}
                      >
                        123 Main St, City
                      </span>{" "}
                      {/* Replace with the actual value */}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>{" "}
          </Col>
          <Col span={18}>
            {/* Function Tabs */}
            <h3>Meter Information</h3>
            <Table />
            <h3>Work Order Information</h3>
            <Table />
          </Col>
        </Row>
        {/* Fields for Account Information, Meter Information, and Work Order Information here */}
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
