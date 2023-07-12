import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProFormDatePicker, ProFormDigit } from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, ConfigProvider, Space } from "antd";
// import "antd/dist/antd.css";
import moment, { Moment } from "moment";
import React, { ReactNode, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number | null;
  effectiveDate: Moment | null;
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
  effectiveDate: Moment | null;
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
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    // Data source
  ]);

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEditMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffChargesDataType
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) =>
        item.key === record.key
          ? { ...item, monthlyMinimumCharges: value || 0 }
          : item
      )
    );
  };

  const handleEditRate = (
    value: number | undefined,
    record: NestedDataType
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => ({
        ...item,
        nestedData: item.nestedData?.map((nestedItem) =>
          nestedItem.key === record.key
            ? { ...nestedItem, rate: value }
            : nestedItem
        ),
      }))
    );
  };

  const handleEditBlock = (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => ({
        ...item,
        nestedData: item.nestedData?.map((nestedItem) =>
          nestedItem.key === record.key
            ? { ...nestedItem, block: value }
            : nestedItem
        ),
      }))
    );
  };

  const handleEditEffectiveDate = (
    value: Moment | null,
    record: NestedDataType
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => ({
        ...item,
        nestedData: item.nestedData?.map((nestedItem) =>
          nestedItem.key === record.key
            ? { ...nestedItem, effectiveDate: value }
            : nestedItem
        ),
      }))
    );
  };

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme["colorText"] }}>{text}</span>
  );

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
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record.monthlyMinimumCharges}
          onChange={(value) => handleEditMonthlyMinimumCharges(value, record)}
        />
      ),
      render: renderText,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
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
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_: ReactNode, entity: TariffChargesDataType) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
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
      render: (text: [number, number]) => (
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record.rate}
          onChange={(value) => handleEditRate(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
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
  ];

  return (
    <ConfigProvider theme={theme}>
      <div>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="tariffCode"
          search={false}
          pagination={false}
          headerTitle="Tariff Charges Maintenance"
          expandable={{
            expandedRowRender: (record) => (
              <EditableTable
                dataSource={record.nestedData || []}
                handleEditRate={handleEditRate}
                handleEditBlock={handleEditBlock}
                handleEditEffectiveDate={handleEditEffectiveDate}
              />
            ),
            rowExpandable: (record) => !!record.nestedData,
          }}
          toolBarRender={() => [
            <Button type="primary" key="add" icon={<EditOutlined />}>
              Add
            </Button>,
            <Button key="import">Import</Button>,
            <Button key="export">Export</Button>,
          ]}
        />
      </div>
    </ConfigProvider>
  );
};

interface EditableTableProps {
  dataSource: NestedDataType[];
  handleEditRate: (value: number | undefined, record: NestedDataType) => void;
  handleEditBlock: (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => void;
  handleEditEffectiveDate: (
    value: Moment | null,
    record: NestedDataType
  ) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({
  dataSource,
  handleEditRate,
  handleEditBlock,
  handleEditEffectiveDate,
}) => {
  const renderText = (text: ReactNode) => <span>{text}</span>;

  const columns: ProColumns<NestedDataType>[] = [
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
      render: (text: [number, number]) => (
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record.rate}
          onChange={(value) => handleEditRate(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
    },
  ];

  return (
    <ProTable<NestedDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      pagination={false}
      search={false}
    />
  );
};

export default TariffChargesMaintenance;
