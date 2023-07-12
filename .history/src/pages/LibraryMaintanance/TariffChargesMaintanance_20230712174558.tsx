import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigitRange,
  ProFormText,
} from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, ConfigProvider, Space } from "antd";
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
        <span>{Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}</span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: number, record: NestedDataType) => (
        <ProFormText
          fieldProps={{
            defaultValue: text,
            onChange: (value) => handleEditRate(value, record),
          }}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date, record: NestedDataType) => (
        <ProFormDatePicker
          fieldProps={{
            defaultValue: moment(text),
            onChange: (value) => handleEditEffectiveDate(value, record),
          }}
        />
      ),
    },
  ];

  return (
    <ProTable<NestedDataType>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      search={false}
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
    <span style={{ color: theme["colorText"] }}>{text}</span>
  );

  const dataSource: TariffChargesDataType[] = [
    // ...
  ];

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
      render: (text: number, record: TariffChargesDataType) =>
        editData[record.key] ? (
          <ProFormDigitRange
            fieldProps={{
              defaultValue: text,
              onChange: (value) =>
                handleEditMonthlyMinimumCharges(value, record),
            }}
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
          <ProFormDatePicker
            fieldProps={{
              defaultValue: moment(text),
              onChange: (value) =>
                handleEditEffectiveDate(value, record as NestedDataType),
            }}
          />
        ) : (
          renderText(text)
        ),
    },
    {
      title: "Nested Data",
      dataIndex: "nestedData",
      key: "nestedData",
      render: (text: NestedDataType[], record: TariffChargesDataType) =>
        editData[record.key] ? (
          <EditableTable
            dataSource={text}
            handleEditRate={handleEditRate}
            handleEditBlock={handleEditBlock}
          />
        ) : (
          renderText(text)
        ),
    },
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
          editable={{
            type: "multiple",
            onSave: async (key, record) => {
              console.log("Save:", key, record);
              // Perform saving logic here
            },
            onChange: (key, record) => {
              console.log("Change:", key, record);
              // Update edited data in the state
              setEditData((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  ...record,
                },
              }));
            },
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
