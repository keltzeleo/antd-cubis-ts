import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox } from "antd";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: string;
  rate: string;
  effectiveDate: string;
  monthlyMinimumCharges: number;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);

  const dataSource: TariffChargesDataType[] = [
    {
      key: "01",
      tariffCode: "T1",
      tariffAbbreviation: "TA1",
      monthlyMinimumCharges: 100,
      effectiveDate: "2022-01-01",
      createdBy: "John Doe",
      createDate: "2022-01-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2022-02-01",
      nestedData: [
        {
          key: "01",
          status: "Active",
          block: "0-10m³",
          rate: "RM 0.03/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
        {
          key: "02",
          status: "Active",
          block: "11-20m³",
          rate: "RM 0.08/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
        {
          key: "03",
          status: "Active",
          block: "11-20m³",
          rate: "RM 0.08/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
      ],
    },
  ];

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      render: (text: string, record: TariffChargesDataType, index: number) => (
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
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: NestedDataType, index: number) => (
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
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  return (
    <ProTable<TariffChargesDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="tariffCode"
      scroll={{ x: "auto" }}
      expandable={{
        expandedRowRender: (record) =>
          record.nestedData ? (
            <ProTable<NestedDataType>
              dataSource={record.nestedData}
              columns={nestedColumns}
              rowKey="key"
              pagination={false}
            />
          ) : null,
        rowExpandable: (record) =>
          !!(record.nestedData && record.nestedData.length > 0),
      }}
      toolBarRender={() => [
        <Checkbox
          checked={showAdditionalColumns}
          onChange={(e) => handleToggleColumns(e.target.checked)}
        >
          Show Log
        </Checkbox>,
      ]}
    />
  );
};

export default TariffChargesMaintenance;
interface NestedDataType {
  key: string;
  status: string;
  block: string;
  rate: string;
  effectiveDate: string;
  monthlyMinimumCharges: number;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);

  const dataSource: TariffChargesDataType[] = [
    {
      key: "01",
      tariffCode: "T1",
      tariffAbbreviation: "TA1",
      monthlyMinimumCharges: 100,
      effectiveDate: "2022-01-01",
      createdBy: "John Doe",
      createDate: "2022-01-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2022-02-01",
      nestedData: [
        {
          key: "01",
          status: "Active",
          block: "0-10m³",
          rate: "RM 0.03/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
        {
          key: "02",
          status: "Active",
          block: "11-20m³",
          rate: "RM 0.08/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
        {
          key: "03",
          status: "Active",
          block: "11-20m³",
          rate: "RM 0.08/m³",
          effectiveDate: "04/07/2020",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2022-01-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2022-02-01",
        },
      ],
    },
  ];

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
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
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
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
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: () => <Button type="primary">Add</Button>,
    },
  ];

  return (
    <ProTable<TariffChargesDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="tariffCode"
      scroll={{ x: "auto" }}
      expandable={{
        expandedRowRender: (record) =>
          record.nestedData ? (
            <ProTable<NestedDataType>
              dataSource={record.nestedData}
              columns={nestedColumns}
              rowKey="key"
              pagination={false}
            />
          ) : null,
        rowExpandable: (record) =>
          !!(record.nestedData && record.nestedData.length > 0),
      }}
      toolBarRender={() => [
        <Checkbox
          checked={showAdditionalColumns}
          onChange={(e) => handleToggleColumns(e.target.checked)}
        >
          Show Log
        </Checkbox>,
      ]}
    />
  );
};

export default TariffChargesMaintenance;
