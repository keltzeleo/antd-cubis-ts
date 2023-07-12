import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  DatePicker,
  InputNumber,
  Space,
  Table,
} from "antd";
import { ColumnType } from "antd/lib/table";
import moment, { Moment } from "moment";
import React, { ReactNode, useState } from "react";

// Import specific styles if required
import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-table/dist/table.css";
import "antd/dist/antd.css";

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

interface EditableTableProps {
  dataSource: NestedDataType[];
  handleEditRate: (value: number | undefined, record: NestedDataType) => void;
  handleEditBlock: (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({
  dataSource,
  handleEditRate,
  handleEditBlock,
}) => {
  const renderText = (text: ReactNode) => <span>{text}</span>;

  const columns: ColumnType<NestedDataType>[] = [
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
        <span>{Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}</span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: number, record: NestedDataType) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handleEditRate(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date, record: NestedDataType) => (
        <DatePicker
          defaultValue={moment(text)}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
    },
  ];

  return (
    <Table<NestedDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      pagination={false}
    />
  );
};

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [editData, setEditData] = useState<
    Partial<Record<string, Partial<TariffChargesDataType>>>
  >({});

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEditMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffChargesDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        monthlyMinimumCharges: value,
      },
    }));
  };

  const handleEditRate = (
    value: number | undefined,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                rate: value,
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const handleEditBlock = (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                block: value,
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const handleEditEffectiveDate = (
    value: Moment | null,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                effectiveDate: value?.format(),
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const renderText = (text: ReactNode) => (
    <span style={theme.colorText}>{text}</span>
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
  ];

  const tableContainerStyle = {
    color: theme["colorText"],
  };

  const columns: ColumnType<TariffChargesDataType>[] = [
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
      render: (text: number, record: TariffChargesDataType) =>
        editData[record.key] ? (
          <InputNumber
            defaultValue={text}
            onChange={(value) => handleEditMonthlyMinimumCharges(value, record)}
          />
        ) : (
          renderText(text)
        ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date, record: TariffChargesDataType) =>
        editData[record.key] ? (
          <DatePicker
            defaultValue={moment(text)}
            onChange={(value) =>
              handleEditEffectiveDate(value, record as NestedDataType)
            }
          />
        ) : (
          renderText(text)
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

  const nestedColumns: ColumnType<NestedDataType>[] = [
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
        <span style={theme.colorText}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: number) => (
        <span style={theme.colorText}>RM {text}/m³</span>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date) => renderText(text),
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
      <div style={tableContainerStyle}>
        <Table<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="tariffCode"
          pagination={false}
          title={() => "Tariff Charges Maintenance"}
          bordered={false}
          expandable={{
            expandedRowRender: (record) => (
              <Table<NestedDataType>
                columns={nestedColumns}
                dataSource={record.nestedData}
                rowKey="key"
                pagination={false}
              />
            ),
            rowExpandable: (record) => !!record.nestedData,
          }}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
