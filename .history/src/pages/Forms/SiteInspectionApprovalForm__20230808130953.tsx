import { Button, DatePicker, Form, Input } from "antd";
import React from "react";

const SiteInspectionApprovalForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <h2>Site Inspection Approval Form</h2>

      <Form.Item
        name="inspectionDate"
        label="Inspection Date"
        rules={[
          {
            required: true,
            message: "Inspection Date is required",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="inspectorName"
        label="Inspector's Name"
        rules={[
          {
            required: true,
            message: "Inspector's Name is required",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="inspectionNotes"
        label="Inspection Notes"
        rules={[
          {
            required: true,
            message: "Inspection Notes are required",
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
    
<div></div>
  );
};

export default SiteInspectionApprovalForm;
