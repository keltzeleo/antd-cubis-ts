import { DatePicker, InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment, { Moment } from "moment";
import React, { useState } from "react";

interface TariffData {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData: NestedData[];
}

interface NestedData {
  key: string;
  status: string;
  block: [number, number];
  rate: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

const TariffChargesMaintenance: React.FC = () => {
  const [data, setData] = useState<TariffData[]>([
    {
      key: "1",
      tariffCode: "TAR-001",
      tariffAbbreviation: "TA",
      monthlyMinimumCharges: 100,
      effectiveDate: "2023-07-01",
      createdBy: "John Doe",
      createDate: "2023-07-01",
      modifiedBy: "John Doe",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "1-1",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-2",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      key: "2",
      tariffCode: "TAR-002",
      tariffAbbreviation: "TB",
      monthlyMinimumCharges: 150,
      effectiveDate: "2023-07-01",
      createdBy: "Jane Smith",
      createDate: "2023-07-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "2-1",
          status: "Applied",
          block: [0, 20],
          rate: 0.05,
          effectiveDate: "2023-07-01",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-2",
          status: "Applied",
          block: [21, 30],
          rate: 0.18,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-3",
          status: "Pending",
          block: [31, 100],
          rate: 0.23,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ]);

  const handleSaveMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffData
  ) => {
    const newData = data.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          monthlyMinimumCharges: value || 0,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleSaveEffectiveDate = (
    value: Moment | undefined,
    record: TariffData
  ) => {
    const newData = data.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          effectiveDate: value ? value.format("YYYY-MM-DD") : "",
        };
      }
      return item;
    });
    setData(newData);
  };

  const tariffColumns: ColumnsType<TariffData> = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      render: (_, record) => (
        <InputNumber
          value={record.monthlyMinimumCharges}
          onChange={(value) => handleSaveMonthlyMinimumCharges(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      render: (_, record) => (
        <DatePicker
          defaultValue={moment(record.effectiveDate)}
          onChange={(value) => handleSaveEffectiveDate(value, record)}
        />
      ),
    },
  ];

  const nestedColumns: ColumnsType<NestedData> = [
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Block",
      dataIndex: "block",
    },
    {
      title: "Rate",
      dataIndex: "rate",
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
    },
  ];

  const expandedRowRender = (record: TariffData) => (
    <Table<NestedData>
      columns={nestedColumns}
      dataSource={record.nestedData}
      pagination={false}
    />
  );

  return (
    <Table<TariffData>
      dataSource={data}
      columns={tariffColumns}
      expandable={{ expandedRowRender }}
      rowKey="key"
      pagination={false}
    />
  );
};

export default TariffChargesMaintenance;
