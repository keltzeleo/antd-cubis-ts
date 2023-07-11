import { SearchOutlined } from "@ant-design/icons";
import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import React, { useState } from "react";

import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Table,
} from "antd";

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface Tariff {
  key: string;
  code: string;
  description: string;
  type: string;
  amount: number;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [data, setData] = useState<Tariff[]>([
    {
      key: "1",
      code: "T1",
      description: "Tariff 1",
      type: "Electricity",
      amount: 10,
    },
    {
      key: "2",
      code: "T2",
      description: "Tariff 2",
      type: "Water",
      amount: 15,
    },
    // Add more tariffs as needed
  ]);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const handleSearch = (value: string) => {
    // Perform search logic here
    const filteredResults = data.filter((tariff) =>
      tariff.description.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredResults);
  };

  const handleFormSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00a991",
          colorError: "#ea7480",
          colorSuccess: "#7fb86d",
          colorWarning: "#ffaa64",
          colorInfo: "#00a991",
          borderRadius: 8,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Mulish', 'Play', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
      }}
    >
      <div style={{ background: "", margin: "10px 10px" }}>
        <>
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                <Space.Compact size="large">
                  <Row align="middle">
                    <span>
                      <Input
                        style={{ marginTop: 24, width: "350px" }}
                        allowClear
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Tariff Description for Quick Search"
                        addonBefore={<SearchOutlined />}
                      />
                    </span>
                  </Row>
                </Space.Compact>
              </span>
            </div>
          </Form.Item>
        </>
      </div>
      <div>
        <Table
          style={{ margin: 10 }}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10, // Set the page size to 10
          }}
          onChange={() => {}}
          size="small"
        />
      </div>
      <Divider />
      <div style={{ margin: "10px" }}>
        <ProForm
          layout="horizontal"
          onFinish={handleFormSubmit}
          submitter={{
            render: (props, defaultDoms) => {
              return [
                <Button key="submit" type="primary" htmlType="submit">
                  Submit
                </Button>,
                <Button key="reset" onClick={props.form?.resetFields}>
                  Reset
                </Button>,
              ];
            },
          }}
        >
          <ProFormText
            label="Tariff Code"
            name="code"
            placeholder="Enter Tariff Code"
            rules={[
              {
                required: true,
                message: "Please enter the tariff code!",
              },
            ]}
          />
          <ProFormText
            label="Tariff Description"
            name="description"
            placeholder="Enter Tariff Description"
            rules={[
              {
                required: true,
                message: "Please enter the tariff description!",
              },
            ]}
          />
          <ProFormSelect
            label="Tariff Type"
            name="type"
            placeholder="Select Tariff Type"
            options={[
              { label: "Electricity", value: "Electricity" },
              { label: "Water", value: "Water" },
            ]}
            rules={[
              {
                required: true,
                message: "Please select the tariff type!",
              },
            ]}
          />
          <ProFormText
            label="Tariff Amount"
            name="amount"
            placeholder="Enter Tariff Amount"
            rules={[
              {
                required: true,
                message: "Please enter the tariff amount!",
              },
              {
                pattern: /^(?:\d*\.\d{1,2}|\d+)$/,
                message: "Invalid amount format. (e.g., 10 or 10.00)",
              },
            ]}
          />
        </ProForm>
      </div>
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
