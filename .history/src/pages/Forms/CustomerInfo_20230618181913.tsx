import { ProForm, ProFormText } from "@ant-design/pro-form";

const CustomerInfo = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <ProForm onFinish={onFinish}>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="id"
          label="ID"
          rules={[{ required: true, message: "Please enter ID" }]}
        />
        <ProFormText
          width="md"
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter Name" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="branch" label="Branch" disabled />
        <ProFormText
          width="md"
          name="customerNo"
          label="Customer No"
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="race"
          label="Race"
          rules={[{ required: true, message: "Please enter Race" }]}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default CustomerInfo;
