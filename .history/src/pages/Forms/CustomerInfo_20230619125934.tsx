import { ProForm, ProFormText } from "@ant-design/pro-form";
import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import CustomerIcNameBoard from "../../customComponents/Notification/CustomerIcNameBoard";

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
    <div>
      <ProForm onFinish={onFinish}>
        {/* ... */}
        <CustomerIcNameBoard namePrefix={namePrefix} name={name} />
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
        {/* ... */}
      </ProForm>
    </div>
  );
};

export default CustomerInfo;
