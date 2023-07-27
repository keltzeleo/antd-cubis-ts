import React, { useState } from "react";
import { Form, Input } from "antd";

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

    // You can reset the form after submission if needed
    form.resetFields();
  };

    // Process form data here (e.g., send it to the server)
    // ...

    // Clear form fields after submission
    setCustomerName("");
    setAddress("");
    setBillAmount("");
  };

  return (
    <div>
    <h2>IssueDepositAndInstallationBill</h2>

    <Form form={form} onFinish={handleSubmit}>

        <label htmlFor="customerName">Customer Name:</label>
        <Input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="billAmount">Bill Amount:</label>
        <Input
          type="number"
          id="billAmount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Issue Bill</button>
    </Form>
  );
};

export default IssueDepositAndInstallationBillForm;
