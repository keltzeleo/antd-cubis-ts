import { DeleteOutlined } from "@ant-design/icons";
import {
  ProColumns,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Checkbox, Form, FormInstance, Space, Typography } from "antd";
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
  const [dataSource, setDataSource] =
    useState<TariffChargesDataType[]>(mockData);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );

  const formRef = useRef<FormInstance | null>(null);
  const nestedFormRef = useRef<FormInstance | null>(null);

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
      key: "no",
      valueType: "indexBorder",
    },
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
      title: "Effective Date (from)",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "effectiveDate"]}
              initialValue={text}
              rules={[{ required: true }]}
            >
              <ProFormDatePicker disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return (
          <Text style={{ color: "red" }}>{text ? renderText(text) : ""}</Text>
        );
      },
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "monthlyMinimumCharges"]}
              initialValue={text}
              rules={[{ required: true }]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }
        return <Text style={{ color: "red" }}>{text}</Text>;
      },
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Nested Data",
            key: "nestedData",
            width: 300,
            render: (_, record) => {
              if (record.isEditing) {
                return (
                  <div>
                    <ProTable<NestedDataType>
                      columns={[
                        {
                          title: "No.",
                          dataIndex: "no",
                          key: "no",
                          valueType: "indexBorder",
                        },
                        {
                          title: "Status",
                          dataIndex: "status",
                          key: "status",
                          render: renderText,
                        },
                        {
                          title: "Block Range",
                          dataIndex: "block",
                          key: "block",
                          render: (text, record) => {
                            if (record.isEditing) {
                              return (
                                <Form.Item
                                  name={[record.key, "block"]}
                                  initialValue={text}
                                  rules={[
                                    { required: true },
                                    () => ({
                                      validator(_, value) {
                                        if (
                                          value &&
                                          value.length === 2 &&
                                          value[0] <= value[1]
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error("Block range is invalid.")
                                        );
                                      },
                                    }),
                                  ]}
                                >
                                  <ProFormDigitRange
                                    disabled={!record.isEditing}
                                  />
                                </Form.Item>
                              );
                            }
                            return <Text style={{ color: "red" }}>{text}</Text>;
                          },
                        },
                        {
                          title: "Rate",
                          dataIndex: "rate",
                          key: "rate",
                          render: (text, record) => {
                            if (record.isEditing) {
                              return (
                                <Form.Item
                                  name={[record.key, "rate"]}
                                  initialValue={text}
                                  rules={[{ required: true }]}
                                >
                                  <ProFormDigit
                                    fieldProps={{ precision: 2 }}
                                    disabled={!record.isEditing}
                                  />
                                </Form.Item>
                              );
                            }
                            return <Text style={{ color: "red" }}>{text}</Text>;
                          },
                        },
                        {
                          title: "Effective Date",
                          dataIndex: "effectiveDate",
                          key: "effectiveDate",
                          render: (text, record) => {
                            if (record.isEditing) {
                              return (
                                <Form.Item
                                  name={[record.key, "effectiveDate"]}
                                  initialValue={text}
                                  rules={[{ required: true }]}
                                >
                                  <ProFormDatePicker
                                    disabled={!record.isEditing}
                                  />
                                </Form.Item>
                              );
                            }
                            return (
                              <Text style={{ color: "red" }}>
                                {text ? renderText(text) : ""}
                              </Text>
                            );
                          },
                        },
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
                        {
                          title: "Actions",
                          key: "actions",
                          fixed: "right",
                          width: 120,
                          render: (_, record) => (
                            <Space
                              style={{
                                justifyContent: "space-evenly",
                                width: "100%",
                              }}
                            >
                              {record.isEditing ? (
                                <>
                                  <Button
                                    type="primary"
                                    onClick={() => handleSave(record.key)}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={() => handleCancel(record.key)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    type="primary"
                                    onClick={() =>
                                      handleEdit(
                                        record.key,
                                        record as TariffChargesDataType
                                      )
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    type="primary"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                      handleDelete(
                                        record as NestedDataType,
                                        undefined
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </Space>
                          ),
                        },
                      ]}
                      rowKey="key"
                      dataSource={record.nestedData}
                      pagination={false}
                      size="small"
                      scroll={{ x: "max-content" }}
                    />
                    <Button
                      type="dashed"
                      onClick={() => handleAddAdditionalRow(record.key)}
                      style={{ marginTop: 8 }}
                    >
                      Add Row
                    </Button>
                  </div>
                );
              }
              return null;
            },
          },
        ]
      : []),
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
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
          {record.isEditing ? (
            <>
              <Button type="primary" onClick={() => handleSave(record.key)}>
                Save
              </Button>
              <Button onClick={() => handleCancel(record.key)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() =>
                  handleEdit(record.key, record as TariffChargesDataType)
                }
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  handleDelete(record as NestedDataType, undefined)
                }
              >
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Checkbox
        checked={showAdditionalColumns}
        onChange={(e) => handleToggleColumns(e.target.checked)}
      >
        Show Additional Columns
      </Checkbox>
      <ProTable<TariffChargesDataType>
        columns={columns}
        rowKey="key"
        dataSource={dataSource}
        expandedRowKeys={expandedRowKeys}
        expandable={{
          expandedRowRender: (record) => (
            <Form form={nestedFormRef.current} component={false}>
              <ProTable<NestedDataType>
                columns={[
                  {
                    title: "No.",
                    dataIndex: "no",
                    key: "no",
                    valueType: "indexBorder",
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: renderText,
                  },
                  {
                    title: "Block Range",
                    dataIndex: "block",
                    key: "block",
                    render: renderText,
                  },
                  {
                    title: "Rate",
                    dataIndex: "rate",
                    key: "rate",
                    render: renderText,
                  },
                  {
                    title: "Effective Date",
                    dataIndex: "effectiveDate",
                    key: "effectiveDate",
                    render: renderText,
                  },
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
                  {
                    title: "Actions",
                    key: "actions",
                    fixed: "right",
                    width: 120,
                    render: (_, nestedRecord) => (
                      <Space
                        style={{
                          justifyContent: "space-evenly",
                          width: "100%",
                        }}
                      >
                        {nestedRecord.isEditing ? (
                          <>
                            <Button
                              type="primary"
                              onClick={() => handleSave(nestedRecord.key)}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => handleCancel(nestedRecord.key)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="primary"
                              onClick={() =>
                                handleEdit(
                                  nestedRecord.key,
                                  nestedRecord as TariffChargesDataType
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                handleDelete(
                                  nestedRecord,
                                  record as TariffChargesDataType
                                )
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Space>
                    ),
                  },
                ]}
                rowKey="key"
                dataSource={record.nestedData}
                pagination={false}
                size="small"
                scroll={{ x: "max-content" }}
              />
            </Form>
          ),
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
        search={false}
        dateFormatter="string"
      />
    </>
  );
};

export default TariffChargesMaintenance;
