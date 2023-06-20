import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

interface CustomerInfoProps {
  customerTitle: string | undefined;
  customerName: string;
  icNumber: string; // Add icNumber property
  onCustomerTitleChange: (value: string | undefined) => void;
  onCustomerNameChange: (value: string) => void;
  onICNumberChange: (value: string) => void; // Add onICNumberChange property
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerTitle,
  customerName,
  icNumber,
  onCustomerTitleChange,
  onCustomerNameChange,
  onICNumberChange,
}) => {
  const handleNamePrefixChange = (value: string | undefined) => {
    onCustomerTitleChange(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerNameChange(e.target.value);
  };

  const handleICNumberChange = (value: string) => {
    onICNumberChange(value); // Call the onICNumberChange callback
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
      <ProForm>
        {/* Rest of the code */}
        <ProForm.Group>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                width="md"
                name="id"
                label="ID"
                disabled
                fieldProps={{ value: icNumber }} // Display icNumber in the ID field
              />
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "red" }}>*</span> Enter Name
              </div>
              <Input
                addonBefore={
                  <Select
                    style={{ width: 85 }}
                    defaultValue=""
                    onChange={handleNamePrefixChange}
                  >
                    <Option value="">Select</Option>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Mdm.">Mdm.</Option>
                  </Select>
                }
                value={customerName}
                onChange={handleNameChange}
                placeholder="Full Name"
              />
            </Col>
          </Row>
        </ProForm.Group>
        {/* Rest of the code */}
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
