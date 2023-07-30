import { Button, Form, Input } from "antd";
import React from "react";

const SiteVisitApprovalForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div
        style={{
          color: theme["colorText"],
          borderRadius: 16,
          padding: "5 24 6  20",
          top: 0,
          margin: "-23 0 -8 0",
          justifyContent: "center",
          backgroundColor: theme["colorPrimaryBg"],
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
