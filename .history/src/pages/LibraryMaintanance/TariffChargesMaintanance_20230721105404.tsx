import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import React, { useState } from "react";

type DataSourceType = {
  id: React.Key;
  no: number;
  tariffCode: string;
  tariffAbbreviation: string;
  effectiveDate: string;
  minimumMonthlyCharges: number;
  blockConsumptions: [number, number][];
  rates: number[];
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

const defaultData: DataSourceType[] = [
  {
    id: 1,
    no: 1,
    tariffCode: "code1",
    tariffAbbreviation: "abbrev1",
    effectiveDate: "2023-07-21",
    minimumMonthlyCharges: 100,
    blockConsumptions: [
      [1, 10],
      [11, 20],
      [21, 30],
      [31, 40],
      [41, 50],
      [51, 60],
    ],
    rates: [1, 2, 3, 4, 5, 6],
    createdBy: "user1",
    createDate: "2023-07-21",
    modifiedBy: "user1",
    modifiedDate: "2023-07-21",
  },
  // Add more mock data here...
];

const EditableTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] =
    useState<readonly DataSourceType[]>(defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    // ...previous columns here...
    {
      title: "Block Consumption 1",
      dataIndex: ["blockConsumptions", 0],
      valueType: "digitRange",
      render: (text, record) => (
        <span>{record.blockConsumptions[0].join(" - ")} m³</span>
      ),
    },
    {
      title: "Rate 1",
      dataIndex: ["rates", 0],
      valueType: "digit",
      render: (text, record) => <span>RM {record.rates[0]}</span>,
    },
    // ...repeat for each Block Consumption and Rate column...
    // ...operation column here...
  ];

  return (
    <EditableProTable<DataSourceType>
      rowKey="id"
      headerTitle="可编辑表格"
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      editable={{
        type: "multiple",
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default EditableTable;
