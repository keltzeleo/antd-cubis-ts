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
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
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
          blockConsumption1: [0, 10],
          rate1: 2,
          blockConsumption2: [11, 20],
          rate2: 0.08,
          blockConsumption3: [21, 30],
          rate3: 0.13,
          blockConsumption4: [31, 40],
          rate4: 0.18,
          blockConsumption5: [41, 50],
          rate5: 0.23,
          blockConsumption6: [51, 60],
          rate6: 0.28,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-2",
          status: "Applied",
          blockConsumption1: [11, 20],
          rate1: 0.08,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-3",
          status: "Pending",
          blockConsumption1: [21, 100],
          rate1: 0.13,
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
          blockConsumption1: [0, 20],
          rate1: 0.05,
          effectiveDate: "2023-07-01",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-2",
          status: "Applied",
          blockConsumption1: [21, 30],
          rate1: 0.18,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2-3",
          status: "Pending",
          blockConsumption1: [31, 100],
          rate1: 0.23,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ]);

  const columns = [
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
      dataIndex: "blockConsumption1",
      key: "blockConsumption1",
      valueType: "digitRange",
    },
    {
      title: "Rate 1",
      dataIndex: "rate1",
      key: "rate1",
      valueType: "digit",
    },
    {
      title: "Block Consumption 2",
      dataIndex: "blockConsumption2",
      key: "blockConsumption2",
      valueType: "digitRange",
    },
    {
      title: "Rate 2",
      dataIndex: "rate2",
      key: "rate2",
      valueType: "digit",
    },
    {
      title: "Block Consumption 3",
      dataIndex: "blockConsumption3",
      key: "blockConsumption3",
      valueType: "digitRange",
    },
    {
      title: "Rate 3",
      dataIndex: "rate3",
      key: "rate3",
      valueType: "digit",
    },
    {
      title: "Block Consumption 4",
      dataIndex: "blockConsumption4",
      key: "blockConsumption4",
      valueType: "digitRange",
    },
    {
      title: "Rate 4",
      dataIndex: "rate4",
      key: "rate4",
      valueType: "digit",
    },
    {
      title: "Block Consumption 5",
      dataIndex: "blockConsumption5",
      key: "blockConsumption5",
      valueType: "digitRange",
    },
    {
      title: "Rate 5",
      dataIndex: "rate5",
      key: "rate5",
      valueType: "digit",
    },
    {
      title: "Block Consumption 6",
      dataIndex: "blockConsumption6",
      key: "blockConsumption6",
      valueType: "digitRange",
    },
    {
      title: "Rate 6",
      dataIndex: "rate6",
      key: "rate6",
      valueType: "digit",
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
      render: (text, record, _, action) => [
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
