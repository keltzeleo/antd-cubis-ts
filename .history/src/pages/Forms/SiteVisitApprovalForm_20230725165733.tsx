import { Form, Input } from "antd";

const SiteVisitApprovalForm: React.FC = () => {
  return (
    <Form>
      <Form.Item
        name="siteName"
        label="Site Name"
        rules={[
          {
            required: true,
            message: "Site Name is required",
          },
        ]}
        validateStatus={form.getFieldError("siteName") ? "error" : ""}
        help={form.getFieldError("siteName")?.join(", ")}
      >
        <Input />
      </Form.Item>
      {/* Add more form fields as needed */}
    </Form>
  );
};

export default SiteVisitApprovalForm;
