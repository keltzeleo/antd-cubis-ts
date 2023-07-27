import { Form, Input } from "antd";
import React, { useState } from "react";

const IssueDepositAndInstallationBillForm: React.FC = () => {
  // Define state variables to hold form data
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div>
        <h2>Issue Deposit and Installation Bill</h2>

        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input.TextArea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Bill Amount"
          name="billAmount"
          rules={[{ required: true, message: "Please enter bill amount" }]}
        >
          <Input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="submit">Issue Bill</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default IssueDepositAndInstallationBillForm;
