import { ProCard } from "@ant-design/pro-card";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Space } from "antd";
import React, { ReactNode, useState } from "react";

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
          key: "1",
          status: "Active",
          block: "Block A",
          rate: "10%",
          effectiveDate: "2023-07-01",
          monthlyMinimumCharges: 50,
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "2",
          status: "Inactive",
          block: "Block B",
          rate: "5%",
          effectiveDate: "2023-07-01",
          monthlyMinimumCharges: 30,
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
          key: "3",
          status: "Active",
          block: "Block C",
          rate: "15%",
          effectiveDate: "2023-07-01",
          monthlyMinimumCharges: 70,
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
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
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Effective Since",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: (text: ReactNode) => (
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
      render: (
        dom: ReactNode,
        entity: TariffChargesDataType,
        index: number,
        action: any,
        schema: any
      ) => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: ReactNode) => (
        <span style={{ color: theme.colorText }}>{text}</span>
      ),
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: (text: ReactNode) => (
              <span style={{ color: theme.colorText }}>{text}</span>
            ),
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: (text: ReactNode) => (
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
      render: (
        dom: ReactNode,
        entity: NestedDataType,
        index: number,
        action: any,
        schema: any
      ) => <Button type="primary">Add</Button>,
    },
  ];

  return (
    <ProTable<TariffChargesDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="tariffCode"
      search={false}
      headerTitle="Tariff Charges Maintenance"
      toolbar={{
        actions: [
          <Checkbox
            key="toggleColumns"
            checked={showAdditionalColumns}
            onChange={(e) => handleToggleColumns(e.target.checked)}
          >
            Show Additional Columns
          </Checkbox>,
        ],
      }}
      expandable={{
        expandedRowRender: (record) => (
          <Space direction="vertical" style={{ width: "100%" }}>
            {record.nestedData &&
              record.nestedData.map((nestedItem) => (
                <ProCard key={nestedItem.key}>
                  <ProCard.Meta
                    title={nestedItem.block}
                    style={{ marginBottom: 16 }}
                    avatar={<Checkbox />}
                  />
                  <ProCard title="Details" size="small">
                    <p>Status: {nestedItem.status}</p>
                    <p>Rate: {nestedItem.rate}</p>
                    <p>Effective Date: {nestedItem.effectiveDate}</p>
                    <p>
                      Monthly Minimum Charges:{" "}
                      {nestedItem.monthlyMinimumCharges}
                    </p>
                    <p>Created By: {nestedItem.createdBy}</p>
                    <p>Create Date: {nestedItem.createDate}</p>
                    <p>Modified By: {nestedItem.modifiedBy}</p>
                    <p>Modified Date: {nestedItem.modifiedDate}</p>
                  </ProCard>
                </ProCard>
              ))}
          </Space>
        ),
        rowExpandable: (record) => !!record.nestedData,
      }}
    />
  );
};

export default TariffChargesMaintenance;
