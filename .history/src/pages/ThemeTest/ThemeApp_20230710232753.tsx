// TariffChargesMaintenance.tsx
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useState } from "react";

interface TariffCharge {
  key: string;
  tariffName: string;
  charge: number;
  description: string;
}

const TariffChargesMaintenance: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const data: TariffCharge[] = [
    {
      key: "1",
      tariffName: "Tariff 1",
      charge: 10,
      description: "Description 1",
    },
    {
      key: "2",
      tariffName: "Tariff 2",
      charge: 20,
      description: "Description 2",
    },
    {
      key: "3",
      tariffName: "Tariff 3",
      charge: 30,
      description: "Description 3",
    },
    // Add more tariff charges as needed
  ];
  const [filteredData, setFilteredData] = useState<TariffCharge[]>(data);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Perform search logic here
    const filteredResults = data.filter((tariffCharge) =>
      tariffCharge.tariffName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const columns = [
    {
      title: "Tariff Name",
      dataIndex: "tariffName",
      sorter: (a: TariffCharge, b: TariffCharge) =>
        a.tariffName.localeCompare(b.tariffName),
    },
    {
      title: "Charge",
      dataIndex: "charge",
      sorter: (a: TariffCharge, b: TariffCharge) => a.charge - b.charge,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <div style={{ margin: 10 }}>
      <Space size="large">
        <Input
          style={{ width: "350px" }}
          allowClear
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Tariff Name for Quick Search"
          addonBefore={<SearchOutlined />}
        />
      </Space>
      <Table
        style={{ marginTop: 10 }}
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />
    </div>
  );
};

export default TariffChargesMaintenance;
