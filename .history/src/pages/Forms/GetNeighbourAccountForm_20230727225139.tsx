import { Button, Form, Input } from "antd";
import React from "react";

const GetNeighbourAccountForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <h2>Get Neighbour Account Form</h2>
        <Form.Item
          name="neighbourName"
          label="Neighbour's Name"
          rules={[
            {
              required: true,
              message: "Neighbour's Name is required",
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
    </div>
  );
};

export default GetNeighbourAccountForm;
