import { ProForm, ProFormText } from "@ant-design/pro-form";
import { useState } from "react";

const CustomerInfo = () => {
  const [name, setName] = useState("");

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    return Promise.resolve();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#e6edf4",
      }}
    >
      <ProForm onFinish={onFinish}>
        <div
          style={{
            height: 30,
            width: "100vh",
            padding: "1px 4px 1px 4px",
            alignContent: "center",
            justifyContent: "center",
            fontWeight: "bold",
            borderRadius: 16,
            background: "#6d8099",
            overflow: "hidden",
            color: "#f3f3f3",
          }}
        >
          <div
            style={{
              fontSize: 45,
              alignContent: "center",
              justifyContent: "center",
              margin: "-20px 0px 0px 10px",
            }}
          >
            010180-14-1010 // {name}
          </div>
        </div>
        <p></p>
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
            placeholder={miao}
            rules={[{ required: true, message: "Please enter Name" }]}
            fieldProps={{
              onChange: handleNameChange,
            }}
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
    </div>
  );
};

export default CustomerInfo;
