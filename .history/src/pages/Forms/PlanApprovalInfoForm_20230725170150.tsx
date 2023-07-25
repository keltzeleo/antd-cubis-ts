import { Button, Form, Input } from "antd";
import React from "react";

const PlanApprovalInfoForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <h2>Plan Approval Info Form</h2>

      <Form.Item
        name="planName"
        label="Plan Name"
        rules={[
          {
            required: true,
            message: "Plan Name is required",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="planDescription"
        label="Plan Description"
        rules={[
          {
            required: true,
            message: "Plan Description is required",
          },
        ]}
      >
        <Input.TextArea />
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

export default PlanApprovalInfoForm;
