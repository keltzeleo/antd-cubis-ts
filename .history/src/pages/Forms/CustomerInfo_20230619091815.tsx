import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Input, Row, Select } from "antd";
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
        border: "0",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "",
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
            background: "#e7eee6",
            overflow: "hidden",
            color: "argb (15, 18, 21, 0.5)",
          }}
        >
          <div
            style={{
              fontSize: 35,
              alignContent: "center",
              justifyContent: "center",
              margin: "-10px 0px 0px 10px",
            }}
          >
            I/C Number // {namePrefix} {name} //
          </div>
        </div>
        <p></p>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText width="md" name="branch" label="Branch" disabled />
            </Col>
            <Col span={12}>
              <ProFormText
                width="md"
                name="customerNo"
                label="Customer No"
                disabled
              />
            </Col>
          </Row>
        </ProForm.Group>
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                width="md"
                name="id"
                label="ID"
                rules={[{ required: true, message: "Please enter ID" }]}
              />
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>Enter Name</div>
              <Input
                addonBefore={
                  <Select defaultValue="Mr." onChange={handleNamePrefixChange}>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                  </Select>
                }
                value={name}
                onChange={handleNameChange}
                placeholder="Full Name"
                style={{ minWidth: 300 }} // Set a minimum width for the input
              />
            </Col>
          </Row>
        </ProForm.Group>

        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                width="md"
                name="race"
                label="Race"
                rules={[{ required: true, message: "Please enter Race" }]}
              />
            </Col>
          </Row>
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
