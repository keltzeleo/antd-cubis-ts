import { Button, Form, Input, Select } from "antd";
import React from "react";

const { Option } = Select;

const ConnectionApprovalForm: React.FC = () => {
  // Define your form logic here, including form submission

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <div>
      <h2>Connection Approval Form</h2>
      <Form onFinish={handleSubmit}>
        {/* Add your form fields here */}
        <Form.Item
          name="connectionType"
          label="Connection Type"
          rules={[
            { required: true, message: "Please select the connection type" },
          ]}
        >
          <Select placeholder="Select connection type">
            <Option value="electricity">Electricity</Option>
            <Option value="water">Water</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
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
    </div>
  );
};

export default ConnectionApprovalForm;
