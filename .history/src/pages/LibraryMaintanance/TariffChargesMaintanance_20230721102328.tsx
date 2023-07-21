import { EditableProTable } from "@ant-design/pro-table";
import React, { useState } from "react";

interface NestedDataType {
  key: string;
  status: string;
  blockConsumption1?: [number, number] | null;
  rate1?: number;
  blockConsumption2?: [number, number] | null;
  rate2?: number;
  blockConsumption3?: [number, number] | null;
  rate3?: number;
  blockConsumption4?: [number, number] | null;
  rate4?: number;
  blockConsumption5?: [number, number] | null;
  rate5?: number;
  blockConsumption6?: [number, number] | null;
  rate6?: number;
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

const TariffChargesMaintenance: React.FC = () => {
  const [dataSource, setDataSource] =
    useState<TariffChargesDataType[]>(/* Insert the provided mock data here */);

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
    {
      title: "Block Consumption 1",
      dataIndex: "nestedData",
      key: "blockConsumption1",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption1;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 1",
      dataIndex: "nestedData",
      key: "rate1",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate1,
    },
    {
      title: "Block Consumption 2",
      dataIndex: "nestedData",
      key: "blockConsumption2",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption2;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 2",
      dataIndex: "nestedData",
      key: "rate2",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate2,
    },
    {
      title: "Block Consumption 3",
      dataIndex: "nestedData",
      key: "blockConsumption3",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption3;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 3",
      dataIndex: "nestedData",
      key: "rate3",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate3,
    },
    {
      title: "Block Consumption 4",
      dataIndex: "nestedData",
      key: "blockConsumption4",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption4;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 4",
      dataIndex: "nestedData",
      key: "rate4",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate4,
    },
    {
      title: "Block Consumption 5",
      dataIndex: "nestedData",
      key: "blockConsumption5",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption5;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 5",
      dataIndex: "nestedData",
      key: "rate5",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate5,
    },
    {
      title: "Block Consumption 6",
      dataIndex: "nestedData",
      key: "blockConsumption6",
      valueType: "digitRange",
      render: (text: any, record: TariffChargesDataType) => {
        const blockConsumption = record.nestedData?.[0]?.blockConsumption6;
        if (blockConsumption) {
          return `${blockConsumption[0]} ~ ${blockConsumption[1]}`;
        }
        return "-";
      },
    },
    {
      title: "Rate 6",
      dataIndex: "nestedData",
      key: "rate6",
      valueType: "digit",
      render: (text: any, record: TariffChargesDataType) =>
        record.nestedData?.[0]?.rate6,
    },
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
      fixed: "right", // fix the Actions column to the right
      width: 150, // set the width for the Actions column
      render: (text, record: TariffChargesDataType, _, action) => [
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
            setDataSource(dataSource.filter((item) => item.key !== record.key));
          }}
        >
          Delete
        </a>,
      ],
    },
  ].map((column) => ({ ...column, width: 150 })); // set the width for all columns

  return (
    <EditableProTable<TariffChargesDataType>
      rowKey="key"
      headerTitle="Tariff Charges Maintenance"
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      scroll={{ x: "max-content" }} // make the table scrollable horizontally
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
