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

  const columns: ColumnsType<TariffChargesDataType> = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Effective Since",
      dataIndex: "effectiveSince",
      key: "effectiveSince",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
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
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: (text: string) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
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
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="tariffCode"
      scroll={{ x: "auto" }}
      expandable={{
        expandedRowRender: (record: TariffChargesDataType) =>
          record.nestedData ? (
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
  );
};

export default TariffChargesMaintenance;
