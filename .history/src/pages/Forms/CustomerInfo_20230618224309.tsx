import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Input, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const CustomerInfo = () => {
  const [namePrefix, setNamePrefix] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    return Promise.resolve();
  };

  const handleNamePrefixChange = (value: string | undefined) => {
    setNamePrefix(value);
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
            width: "100%",
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
            I/C Number // {namePrefix} {name} //
          </div>
        </div>
        <p></p>
        <ProForm.Group>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ProFormText
              width="md"
              name="id"
              label="ID"
              rules={[{ required: true, message: "Please enter ID" }]}
            />
            <div style={{ flex: 1, marginLeft: 16 }}>
              <div style={{ marginBottom: 8 }}>Enter Name</div>
              <div style={{ display: "flex" }}>
                <Select
                  defaultValue="Mr."
                  onChange={handleNamePrefixChange}
                  style={{ width: 70, marginRight: 8 }}
                >
                  <Option value="Mr.">Mr.</Option>
                  <Option value="Ms.">Ms.</Option>
                  <Option value="Mdm.">Mdm.</Option>
                </Select>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Full Name"
                  style={{ flex: 1 }} // Set the input to fill the remaining space
                />
              </div>
            </div>
          </div>
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
