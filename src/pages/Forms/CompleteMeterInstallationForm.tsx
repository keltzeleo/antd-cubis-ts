import { Form, Input } from "antd";
import React from "react";

const CompleteMeterInstallationForm: React.FC = () => {
  // Define form instance using Form.useForm()
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);

    // You can reset the form after submission if needed
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <h2>Complete Meter Installation</h2>

        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Meter Serial Number"
          name="meterSerialNumber"
          rules={[
            { required: true, message: "Please enter meter serial number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Installation Date"
          name="installationDate"
          rules={[
            { required: true, message: "Please select installation date" },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item>
          <button type="submit">Submit Work Order</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CompleteMeterInstallationForm;
