import { SearchOutlined } from "@ant-design/icons";
import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Button, Divider, Input, Table } from "antd";
import React, { useState } from "react";

interface Tariff {
  key: string;
  code: string;
  description: string;
  type: string;
  amount: number;
}

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [data, setData] = useState<Tariff[]>([
    {
      key: "1",
      tariffCode: "T1",
      tariffAbbreviation: "Tariff 1",
      monthlyMinimumCharge: "Electricity",
      effectiveDateFrom: 10,
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
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
    },
    {
      title: "Monthly Minimum Charge",
      dataIndex: "monthlyMinimumCharge",
      key: "monthlyMinimumCharge",
    },
    {
      title: "Effective Date From",
      dataIndex: "effectiveDateFrom",
      key: "effectiveDateFrom",
    },
  ];

  const handleSearch = (value: string) => {
    // Perform search logic here
    const filteredResults = data.filter((tariff) =>
      tariff.description.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredResults);
  };

  const handleFormSubmit = async (values: any) => {
    // Handle form submission
    console.log(values);
  };

  const expandedRowRender = (record: Tariff) => {
    return (
      <p style={{ margin: 0 }}>
        <b>Tariff Code: </b> {record.code} <br />
        <b>Tariff Description: </b> {record.description} <br />
        <b>Tariff Type: </b> {record.type} <br />
        <b>Tariff Amount: </b> {record.amount}
      </p>
    );
  };

  return (
    <div>
      <div style={{ background: "", margin: "10px 10px" }}>
        <>
          <Input
            style={{ marginTop: 24, width: "350px" }}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tariff Description for Quick Search"
            prefix={<SearchOutlined />}
          />
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
          expandable={{ expandedRowRender }}
        />
      </div>
      <Divider />
      <div style={{ margin: "10px" }}>
        <ProForm
          layout="horizontal"
          onFinish={handleFormSubmit}
          submitter={{
            render: (_, defaultDoms) => {
              return [
                <Button key="submit" type="primary" htmlType="submit">
                  Submit
                </Button>,
                <Button key="reset" onClick={() => {}}>
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
    </div>
  );
};

export default TariffChargesMaintenance;
