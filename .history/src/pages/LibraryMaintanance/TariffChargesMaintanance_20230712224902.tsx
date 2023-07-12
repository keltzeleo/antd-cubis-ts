import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProFormDigit } from "@ant-design/pro-form";
import { EditableProTable, ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, DatePicker, Form, Space, message } from "antd";
import React, { ReactNode, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number;
  effectiveDate: string;
  isEditing?: boolean;
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
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
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
  ]);

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleSave = (record: NestedDataType) => {
    form.validateFields().then((values) => {
      // Do your API calls here with values
      // reset isEditing state
      setDataSource((dataSource) =>
        dataSource.map((item) =>
          item.key === record.key
            ? { ...item, ...values, isEditing: false }
            : item
        )
      );
      message.success("Record updated successfully.");
    });
  };

  const handleDelete = (record: NestedDataType) => {
    console.log("Delete record", record);
    // Handle delete logic here
  };

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      render: renderText,
    },
    // rest of the columns
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAdd(record)}>
          Add
        </Button>
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
      render: (text: ReactNode, record: NestedDataType) => (
        <span style={{ color: theme["colorText"] }}>
          {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
        </span>
      ),
      valueType: "number",
      editable: true, // Allow editing block values
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="rate"
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input a valid rate.",
                },
              ]}
            >
              <ProFormDigit fieldProps={{ precision: 2 }} />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme["colorText"] }}>
            {typeof text === "number" ? `RM ${text.toFixed(2)}/m³` : ""}
          </span>
        );
      },
      valueType: "number",
      editable: true, // Allow editing rate values
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name="effectiveDate">
              <DatePicker />
            </Form.Item>
          );
        }
        return renderText(text);
      },
      valueType: "date",
      editable: true, // Allow editing effectiveDate values
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
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <EditableProTable<TariffChargesDataType, NestedDataType>
        rowKey="tariffCode"
        headerTitle="Tariff Charges Maintenance"
        columns={columns}
        request={(params, sorter, filter) => {
          // Handle table data fetching here
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: dataSource,
            success: true,
          });
        }}
        editable={{
          type: "single", // Change type to "single"
          onSave: handleSave,
          onDelete: handleDelete,
          editableKeys: dataSource.map((item) => item.key),
          onChange: (editableKeys) => {
            setDataSource((prevDataSource) =>
              prevDataSource.map((item) => ({
                ...item,
                isEditing: editableKeys.includes(item.key),
              }))
            );
          },
        }}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <EditableProTable<NestedDataType>
                rowKey="key"
                columns={nestedColumns}
                request={(params, sorter, filter) => {
                  // Handle nested table data fetching here
                  console.log(params, sorter, filter);
                  return Promise.resolve({
                    data: record.nestedData || [],
                    success: true,
                  });
                }}
                editable={{
                  type: "single", // Change type to "single"
                  form,
                  editableKeys:
                    record.nestedData?.map((item) => item.key) || [],
                  onSave: handleSave,
                  onDelete: handleDelete,
                  onChange: (editableKeys) => {
                    setDataSource((prevDataSource) =>
                      prevDataSource.map((item) =>
                        item.key === record.key
                          ? {
                              ...item,
                              nestedData:
                                item.nestedData?.map((nestedItem) => ({
                                  ...nestedItem,
                                  isEditing: editableKeys.includes(
                                    nestedItem.key
                                  ),
                                })) || [],
                            }
                          : item
                      )
                    );
                  },
                }}
              />
            );
          },
          rowExpandable: (record) => !!record.nestedData,
        }}
        options={{
          search: false,
          bordered: false,
        }}
        toolBarRender={() => [
          <Checkbox
            key="toggleColumns"
            checked={showAdditionalColumns}
            onChange={(e) => handleToggleColumns(e.target.checked)}
          >
            Show Additional Columns
          </Checkbox>,
        ]}
      />
    </Form>
  );
};

export default TariffChargesMaintenance;
