import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

interface CustomerInfoProps {
  namePrefix: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  namePrefix,
  onNameChange,
}) => {
  return (
    <div
      style={{
        border: "0",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "",
      }}
    >
      <ProForm>
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
          }}
        >
          <div
            style={{
              fontSize: 35,
              alignContent: "center",
              justifyContent: "center",
              margin: "-10px 0px 0px 10px",
              opacity: 0.12, // Set the opacity value to make the text translucent
            }}
          >
            I/C Number // {namePrefix} // {name}
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
                  <Select defaultValue={namePrefix}>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                  </Select>
                }
                onChange={onNameChange}
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
