import { Button, Checkbox, Table } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface TariffChargesDataType {
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveSince: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: Array<any>;
  showNestedTable?: boolean;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);

  const dataSource: TariffChargesDataType[] = [
    {
      tariffCode: "T1",
      tariffAbbreviation: "TA1",
      monthlyMinimumCharges: 100,
      effectiveSince: "2022-01-01",
      createdBy: "John Doe",
      createDate: "2022-01-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2022-02-01",
      nestedData: [
        {
          status: "Active",
          block: "Block1",
          rate: 50,
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
      ],
    },
  ];

  const handleToggleColumns = (e: CheckboxChangeEvent) => {
    setShowAdditionalColumns(e.target.checked);
  };

  const handleToggleNestedTable = (record: TariffChargesDataType) => {
    record.showNestedTable = !record.showNestedTable;
    // Force update the state to reflect the changes
    setShowAdditionalColumns(!showAdditionalColumns);
  };

  const columns: ColumnsType<TariffChargesDataType> = [
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
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
    },
    {
      title: "Effective Since",
      dataIndex: "effectiveSince",
      key: "effectiveSince",
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
          },
        ]
      : []),
    {
      title: (
        <>
          <Checkbox
            checked={showAdditionalColumns}
            onChange={handleToggleColumns}
          >
            Show Log
          </Checkbox>
        </>
      ),
      dataIndex: "toggle",
      key: "toggle",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right" as const,
      width: 100,
      render: (_, record) => (
        <Checkbox
          checked={record.showNestedTable}
          onChange={() => handleToggleNestedTable(record)}
        >
          Show Details
        </Checkbox>
      ),
    },
  ];

  const nestedColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "nestedMonthlyMinimumCharges",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "nestedCreatedBy",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "nestedCreateDate",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "nestedModifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "nestedModifiedDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="tariffCode"
        scroll={{ x: "auto" }}
        expandable={{
          expandedRowRender: (record: TariffChargesDataType) =>
            record.showNestedTable ? (
              <Table
                dataSource={record.nestedData}
                columns={nestedColumns}
                pagination={false}
              />
            ) : null,
          rowExpandable: (record: TariffChargesDataType) =>
            !!(record.nestedData && record.nestedData.length > 0),
        }}
      />
    </>
  );
};

export default TariffChargesMaintenance;
