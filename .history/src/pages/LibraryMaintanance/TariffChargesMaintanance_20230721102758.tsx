import { EditableProTable, ProColumns } from "@ant-design/pro-table";
import React, { useState } from "react";

interface NestedDataType {
  key: string;
  status: string;
  blockConsumption?: [number, number] | null;
  rate?: number;
  effectiveDate?: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  effectiveDate?: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

const mockData: TariffChargesDataType[] = [
  {
    key: "1",
    tariffCode: "TC001",
    tariffAbbreviation: "TA001",
    monthlyMinimumCharges: 100,
    effectiveDate: "2023-07-01",
    createdBy: "John Doe",
    createDate: "2023-07-01",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-01",
    nestedData: [
      {
        key: "1",
        status: "Active",
        blockConsumption: [
          [0, 100],
          [101, 200],
        ],
        rate: [0.5, 0.7],
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
    tariffCode: "TC002",
    tariffAbbreviation: "TA002",
    monthlyMinimumCharges: 150,
    effectiveDate: "2023-08-01",
    createdBy: "Jane Smith",
    createDate: "2023-08-01",
    modifiedBy: "Jane Smith",
    modifiedDate: "2023-08-01",
    nestedData: [
      {
        key: "2",
        status: "Active",
        blockConsumption: [
          [0, 50],
          [51, 100],
          [101, 200],
        ],
        rate: [0.3, 0.5, 0.7],
        effectiveDate: "2023-08-01",
        createdBy: "Jane Smith",
        createDate: "2023-08-01",
        modifiedBy: "Jane Smith",
        modifiedDate: "2023-08-01",
      },
    ],
  },
];

const TariffChargesMaintenance: React.FC = () => {
  const [dataSource, setDataSource] =
    useState<TariffChargesDataType[]>(mockData);

  const columns: ProColumns<TariffChargesDataType, "text">[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      readonly: true,
      valueType: "indexBorder",
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      readonly: true,
      key: "tariffCode",
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      readonly: true,
      key: "tariffAbbreviation",
    },
    {
      title: "Effective Date (from)",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      valueType: "digit",
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      title: `Block Consumption ${i + 1}`,
      dataIndex: "nestedData",
      key: `blockConsumption${i + 1}`,
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption;
        if (blockConsumption) {
          return `${blockConsumption[i]?.[0] ?? ""} ~ ${
            blockConsumption[i]?.[1] ?? ""
          }`;
        }
        return "-";
      },
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      title: `Rate ${i + 1}`,
      dataIndex: "nestedData",
      key: `rate${i + 1}`,
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate?.[i],
    })),
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      readonly: true,
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      readonly: true,
      valueType: "date",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      readonly: true,
      key: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      readonly: true,
      key: "modifiedDate",
      valueType: "date",
    },
    {
      title: "Actions",
      key: "actions",
      valueType: "option",
      fixed: "right",
      width: 150,
      render: (
        text: any,
        record: TariffChargesDataType,
        _: any,
        action: any
      ) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource((prevDataSource) =>
              prevDataSource.filter((item) => item.key !== record.key)
            );
          }}
        >
          Delete
        </a>,
      ],
    },
  ].map((column) => ({ ...column, width: 150 }));

  return (
    <EditableProTable<TariffChargesDataType>
      rowKey="key"
      headerTitle="Tariff Charges Maintenance"
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      scroll={{ x: "max-content" }}
      recordCreatorProps={{
        newRecordType: "dataSource",
        position: "bottom",
        record: () => ({
          key: Date.now().toString(),
          tariffCode: "",
          tariffAbbreviation: "",
          createdBy: "",
          createDate: "",
          modifiedBy: "",
          modifiedDate: "",
          nestedData: [
            {
              key: Date.now().toString(),
              status: "",
              createdBy: "",
              createDate: "",
              modifiedBy: "",
              modifiedDate: "",
            },
          ],
        }),
      }}
      editable={{
        type: "multiple",
        editableKeys: dataSource.map((item) => item.key),
        onValuesChange: (record, recordList) => {
          setDataSource(recordList);
        },
        actionRender: (row, config, dom) => [dom.save, dom.cancel],
      }}
    />
  );
};

export default TariffChargesMaintenance;
