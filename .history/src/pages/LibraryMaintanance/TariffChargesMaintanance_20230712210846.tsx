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
import dayjs from "dayjs";
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
  effectiveDate: Moment | null; // Updated type declaration
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
  effectiveDate: Moment | null; // Updated type declaration
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
    {
      key: "01",
      tariffCode: "TAR-001",
      tariffAbbreviation: "TA",
      monthlyMinimumCharges: 100,
      effectiveDate: moment("2023-07-01"), // Use moment() instead of dayjs()
      createdBy: "John Doe",
      createDate: "2023-07-01",
      modifiedBy: "John Doe",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "01=1",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: moment("04/07/2020", "DD/MM/YYYY"), // Use moment() instead of dayjs()
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "01-3",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: moment("2023-07-01"), // Use moment() instead of dayjs()
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "01-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: moment("04/07/2020", "DD/MM/YYYY"), // Use moment() instead of dayjs()
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
      effectiveDate: moment("2023-07-01"),
      createdBy: "Jane Smith",
      createDate: "2023-07-01",
      modifiedBy: "Jane Smith",
      modifiedDate: "2023-07-01",
      nestedData: [
        {
          key: "02-1",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: moment("04/07/2020", "DD/MM/YYYY"),
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
      ],
    },
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
      render: (text: Dayjs | null, record: NestedDataType) => (
        <DatePicker
          defaultValue={text ? dayjs(text) : null} // Convert Moment to Dayjs
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
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: number) => (
        <span style={{ color: theme["colorText"] }}>RM {text}/m³</span>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: Dayjs | null, record: NestedDataType) => (
        <DatePicker
          defaultValue={text ? dayjs(text) : null} // Convert Moment to Dayjs
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
        <Table<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="tariffCode"
          pagination={false}
          title={() => "Tariff Charges Maintenance"}
          bordered={false}
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
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
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
      render: (text: Dayjs | null, record: NestedDataType) => (
        <DatePicker
          defaultValue={text ? dayjs(text) : null} // Convert Moment to Dayjs
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

export default TariffChargesMaintenance;
