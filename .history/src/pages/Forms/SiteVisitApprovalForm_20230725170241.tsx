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
      <h2>Site Visit Approval Form</h2>

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
