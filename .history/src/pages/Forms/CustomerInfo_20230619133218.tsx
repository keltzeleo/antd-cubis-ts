import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

interface CustomerInfoProps {
  namePrefix: string | undefined;
  name: string;
  onNamePrefixChange: (value: string | undefined) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  namePrefix,
  name,
  onNamePrefixChange,
  onNameChange,
}) => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    return Promise.resolve();
  };

  return (
    <div>
      <ProForm onFinish={onFinish}>
        {/* ... */}
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
                  <Select defaultValue="Mr." onChange={onNamePrefixChange}>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                  </Select>
                }
                value={name}
                onChange={onNameChange}
                placeholder="Full Name"
                style={{ minWidth: 300 }}
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
