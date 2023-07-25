import { Form, Input } from "antd";
import React from "react";

const GetNeighbourAccountForm: React.FC = () => {
  return (
    <Form>
      <Form.Item
        name="neighbourName"
        label="Neighbour's Name"
        rules={[
          {
            required: true,
            message: "Neighbour's Name is required",
          },
        ]}
        validateStatus={form.getFieldError("neighbourName") ? "error" : ""}
        help={form.getFieldError("neighbourName")?.join(", ")}
      >
        <Input />
      </Form.Item>
      {/* Add more form fields as needed */}
    </Form>
  );
};

export default GetNeighbourAccountForm;
