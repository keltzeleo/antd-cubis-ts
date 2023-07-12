import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Checkbox, ConfigProvider, Space } from "antd";
import React, { ReactNode, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number | null;
  effectiveDate: string | number | Date;
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
  effectiveDate: string | number | Date;
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

  // Define a function to render the text with the desired style
  const renderText = (text: ReactNode) => (
    <span style={{ color: theme["colorText"] }}>{text}</span>
  );

  const dataSource: TariffChargesDataType[] = [
    {
      key: "01",
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
          key: "01",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "04/07/2020",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "02",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "04/07/2023",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "03",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "04/07/2024",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      key: "02",
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
          key: "01",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "04/07/2020",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (
        _: ReactNode,
        entity: NestedDataType,
        index: number,
        action: any,
        schema: any
      ) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const tableContainerStyle = {
    color: theme["colorText"],
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      render: renderText,
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      render: renderText,
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      render: renderText,
    },
    {
      title: "Effective Since",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: renderText,
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: renderText,
          },
        ]
      : []),
    // ...
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderText,
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text: ReactNode) => (
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: ReactNode) => (
        <span style={{ color: theme["colorText"] }}>RM {text}/m³</span>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: renderText,
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            render: renderText,
          },
        ]
      : []),
    // ...
  ];

  return (
    <ConfigProvider theme={theme}>
      <div style={tableContainerStyle}>
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
              <ProTable<NestedDataType>
                columns={nestedColumns}
                dataSource={record.nestedData}
                rowKey="key"
                search={false}
                pagination={false}
              />
            ),
            rowExpandable: (record) => !!record.nestedData,
          }}
          bordered={false}
        />
      </div>
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
