import { Button, Form, Input } from "antd";
import React from "react";

const SiteVisitApprovalForm: React.FC = ({}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div
        style={{
          color: "#f3f6f9",
          borderRadius: 16,
          padding: "0 0 0 8"
          top: 0,
          justifyContent: "center",
          backgroundColor: "#00a991",
          fontSize: 12,
        }}
      >
        <h2>Site Visit Approval Form</h2>
      </div>
      <Form.Item
        name="siteName"
        label="Site Name"
        rules={[
          {
            required: true,
            message: "Site Name is required",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Add more form fields as needed */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SiteVisitApprovalForm;
