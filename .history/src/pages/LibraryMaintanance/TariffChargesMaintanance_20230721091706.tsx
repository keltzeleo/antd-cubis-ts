import { EditableProTable } from "@ant-design/pro-table";
import React, { useState } from "react";

interface NestedDataType {
  key: string;
  status: string;
  block?: [number, number] | null;
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
          block: [0, 10],
          rate: 2,
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

  const columns: ProColumns<TariffChargesDataType>[] = [
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
            setDataSource(dataSource.filter((item) => item.key !== record.key));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable<TariffChargesDataType>
      rowKey="key"
      headerTitle="Tariff Charges Maintenance"
      columns={columns}
      value={dataSource}
      onChange={(newDataSource) => setDataSource([...newDataSource])}
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
