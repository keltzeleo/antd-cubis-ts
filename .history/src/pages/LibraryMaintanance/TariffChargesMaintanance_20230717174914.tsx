import {
  ProColumns,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import React, { useRef, useState } from "react";

const { Text } = Typography;

type TariffChargesDataType = {
  key: React.Key;
  no: number;
  tariffCode: string;
  tariffAbbreviation: string;
  effectiveDate: string;
  monthlyMinimumCharges: number;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
  isEditing?: boolean;
};

type NestedDataType = {
  key: React.Key;
  no: number;
  status: string;
  block: [number, number] | null;
  rate: number | undefined;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  isEditing?: boolean;
};

const TariffChargesMaintenance: React.FC = () => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );

  const formRef = useRef<Form<any> | null>(null);
  const nestedFormRef = useRef<Form<any> | null>(null);

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleSave = async (key: React.Key) => {
    try {
      const values = await formRef.current?.validateFields();
      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          return {
            ...record,
            ...values[key],
            isEditing: false,
            nestedData: record.nestedData?.map((nestedItem) => ({
              ...nestedItem,
              isEditing: false,
            })),
          };
        }
        return record;
      });
      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
    } catch (error) {
      console.log("Save Error:", error);
    }
  };

  const handleCancel = (key: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          const originalRecord = dataSource.find((item) => item.key === key);
          return {
            ...originalRecord!,
            isEditing: false,
            nestedData: originalRecord!.nestedData?.map((nestedItem) => ({
              ...nestedItem,
              isEditing: false,
            })),
          };
        }
        return record;
      })
    );
    setEditingRecordKey(null);
  };

  const handleEdit = (
    key: React.Key,
    record: TariffChargesDataType | undefined
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.key === key) {
          return { ...item, isEditing: true };
        }
        return item;
      })
    );
    setEditingRecordKey(key);
  };

  const handleDelete = (
    nestedRecord: NestedDataType | undefined,
    mainRecord: TariffChargesDataType | undefined
  ) => {
    if (nestedRecord && mainRecord) {
      console.log("Delete nested record", nestedRecord);
      // Handle nested record delete logic here
    } else if (mainRecord) {
      console.log("Delete main record", mainRecord);
      // Handle main record delete logic here
    }
  };

  const handleAddAdditionalRow = (recordKey: React.Key) => {
    const newData: NestedDataType = {
      key: generateUniqueKey(),
      no: 0,
      status: "",
      block: null,
      rate: undefined,
      effectiveDate: "",
      createdBy: "",
      createDate: "",
      modifiedBy: "",
      modifiedDate: "",
      isEditing: true,
    };

    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.key === recordKey) {
          const updatedItem = {
            ...item,
            nestedData: item.nestedData
              ? [...item.nestedData, newData]
              : [newData],
          };
          return updatedItem;
        }
        return item;
      })
    );

    setExpandedRowKeys((prevExpandedRowKeys) => [
      ...prevExpandedRowKeys,
      recordKey,
    ]);
  };

  const generateUniqueKey = (): React.Key => {
    const timestamp = new Date().getTime();
    return `new-row-${timestamp}`;
  };

  const renderText = (text: React.ReactNode) => {
    if (typeof text === "object" && text !== null) {
      if (text.hasOwnProperty("value") && text.hasOwnProperty("offset")) {
        const { value, offset } = text as { value: string; offset: number };
        const date = new Date(value);
        date.setMinutes(date.getMinutes() - offset);
        const adjustedDate = date.toISOString().split("T")[0];
        return adjustedDate;
      }
      return JSON.stringify(text);
    }
    return <Text style={{ color: "red" }}>{text}</Text>;
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      valueType: "indexBorder",
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      valueType: "text",
      renderFormItem: () => <Input />,
      render: (_, record) => renderText(record.tariffCode),
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      valueType: "text",
      renderFormItem: () => <Input />,
      render: (_, record) => renderText(record.tariffAbbreviation),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      valueType: "date",
      renderFormItem: () => <ProFormDatePicker />,
      render: (_, record) => renderText(record.effectiveDate),
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      valueType: "digit",
      renderFormItem: () => <ProFormDigit />,
      render: (_, record) => renderText(record.monthlyMinimumCharges),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      valueType: "text",
      renderFormItem: () => <Input />,
      render: (_, record) => renderText(record.createdBy),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      valueType: "dateTime",
      renderFormItem: () => <ProFormDatePicker showTime />,
      render: (_, record) => renderText(record.createDate),
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      valueType: "text",
      renderFormItem: () => <Input />,
      render: (_, record) => renderText(record.modifiedBy),
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      valueType: "dateTime",
      renderFormItem: () => <ProFormDatePicker showTime />,
      render: (_, record) => renderText(record.modifiedDate),
    },
    {
      title: "Operation",
      valueType: "option",
      dataIndex: "operation",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <div>
              <Button
                type="link"
                onClick={() => handleSave(record.key)}
                style={{ marginRight: 8 }}
              >
                Save
              </Button>
              <Button type="link" onClick={() => handleCancel(record.key)}>
                Cancel
              </Button>
            </div>
          );
        }
        return (
          <div>
            <Button
              type="link"
              onClick={() => handleEdit(record.key, record)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              type="link"
              onClick={() => handleDelete(undefined, record)}
              danger
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const expandedRowRender = (record: TariffChargesDataType) => {
    const nestedColumns: ProColumns<NestedDataType>[] = [
      {
        title: "No.",
        dataIndex: "no",
        valueType: "indexBorder",
        width: 50,
      },
      {
        title: "Status",
        dataIndex: "status",
        valueType: "text",
        width: 100,
        renderFormItem: () => <Input />,
        render: (_, nestedRecord) => renderText(nestedRecord.status),
      },
      {
        title: "Block",
        dataIndex: "block",
        valueType: "digitRange",
        width: 100,
        renderFormItem: () => <ProFormDigitRange />,
        render: (_, nestedRecord) => renderText(nestedRecord.block),
      },
      {
        title: "Rate",
        dataIndex: "rate",
        valueType: "digit",
        width: 100,
        renderFormItem: () => <ProFormDigit />,
        render: (_, nestedRecord) => renderText(nestedRecord.rate),
      },
      {
        title: "Effective Date",
        dataIndex: "effectiveDate",
        valueType: "date",
        width: 120,
        renderFormItem: () => <ProFormDatePicker />,
        render: (_, nestedRecord) => renderText(nestedRecord.effectiveDate),
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        valueType: "text",
        width: 100,
        renderFormItem: () => <Input />,
        render: (_, nestedRecord) => renderText(nestedRecord.createdBy),
      },
      {
        title: "Create Date",
        dataIndex: "createDate",
        valueType: "dateTime",
        width: 160,
        renderFormItem: () => <ProFormDatePicker />,
        render: (_, nestedRecord) => renderText(nestedRecord.createDate),
      },
      {
        title: "Modified By",
        dataIndex: "modifiedBy",
        valueType: "text",
        width: 100,
        renderFormItem: () => <Input />,
        render: (_, nestedRecord) => renderText(nestedRecord.modifiedBy),
      },
      {
        title: "Modified Date",
        dataIndex: "modifiedDate",
        valueType: "dateTime",
        width: 160,
        renderFormItem: () => <ProFormDatePicker />,
        render: (_, nestedRecord) => renderText(nestedRecord.modifiedDate),
      },
      {
        title: "Operation",
        valueType: "option",
        dataIndex: "operation",
        width: 120,
        fixed: "right",
        render: (_, nestedRecord) => {
          if (nestedRecord.isEditing) {
            return (
              <div>
                <Button
                  type="link"
                  onClick={() => handleSave(nestedRecord.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button
                  type="link"
                  onClick={() => handleCancel(nestedRecord.key)}
                >
                  Cancel
                </Button>
              </div>
            );
          }
          return (
            <div>
              <Button
                type="link"
                onClick={() => handleEdit(nestedRecord.key, nestedRecord)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                type="link"
                onClick={() => handleDelete(nestedRecord, record)}
                danger
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Form form={nestedFormRef.current} component={false}>
        <ProTable<NestedDataType>
          columns={nestedColumns}
          dataSource={record.nestedData}
          search={false}
          pagination={false}
          options={{
            fullScreen: true,
            setting: true,
            density: true,
          }}
          toolbar={{
            actions: [
              <Button
                type="primary"
                key="add"
                onClick={() => handleAddAdditionalRow(record.key)}
              >
                Add
              </Button>,
            ],
          }}
          rowKey="key"
          rowClassName={(record) => (record.isEditing ? "editable-row" : "")}
        />
      </Form>
    );
  };

  return (
    <>
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <Checkbox
          checked={showAdditionalColumns}
          onChange={(e) => handleToggleColumns(e.target.checked)}
        >
          Show Additional Columns
        </Checkbox>
      </Space>
      <Form form={formRef.current} component={false}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          search={false}
          pagination={false}
          options={{
            fullScreen: true,
            setting: true,
            density: true,
          }}
          toolbar={{
            actions: [
              <Button type="primary" key="new" onClick={() => {}}>
                New
              </Button>,
            ],
          }}
          rowKey="key"
          rowClassName={(record) => (record.isEditing ? "editable-row" : "")}
          expandedRowRender={expandedRowRender}
          expandable={{
            expandedRowKeys,
            expandRowByClick: true,
            onExpandedRowsChange: (expandedRows) => {
              setExpandedRowKeys(expandedRows);
            },
          }}
          editable={{
            type: "multiple",
            editableKeys: editingRecordKey !== null ? [editingRecordKey] : [],
            onSave: handleSave,
            onCancel: handleCancel,
            onChange: setEditingRecordKey,
          }}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
