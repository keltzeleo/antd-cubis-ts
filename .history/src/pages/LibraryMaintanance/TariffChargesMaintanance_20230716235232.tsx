import { DeleteOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Form, FormInstance, Space } from "antd";
import React, { ReactNode, useRef, useState } from "react";

type TariffChargesDataType = {
  key: React.Key;
  tariffCode: string;
  tariffAbbreviation: string;
  effectiveDate: string;
  monthlyMinimumCharges: number;
  isEditing: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
};

type NestedDataType = {
  key: React.Key;
  status: string;
  block: [number, number] | null;
  rate: number | undefined;
  effectiveDate: string;
  isEditing: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

const TariffChargesMaintenance = () => {
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);
  const formRef = useRef<FormInstance<any> | null>(null);
  const nestedFormRef = useRef<FormInstance<any> | null>(null);

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEdit = (
    key: React.Key,
    record: TariffChargesDataType | NestedDataType
  ) => {
    if ("nestedData" in record) {
      setDataSource((prevDataSource) =>
        prevDataSource.map((item) => {
          if (item.key === key) {
            return {
              ...item,
              isEditing: true,
            };
          }
          return item;
        })
      );
    } else {
      const updatedDataSource = dataSource.map((item) => {
        if (item.nestedData) {
          return {
            ...item,
            nestedData: item.nestedData.map((nestedItem) => {
              if (nestedItem.key === key) {
                return {
                  ...nestedItem,
                  isEditing: true,
                };
              }
              return nestedItem;
            }),
          };
        }
        return item;
      });
      setDataSource(updatedDataSource);
    }
  };

  const handleSave = (key: React.Key) => {
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === key) {
        return {
          ...record,
          isEditing: false,
        };
      }
      if (record.nestedData) {
        return {
          ...record,
          nestedData: record.nestedData.map((nestedItem) => {
            if (nestedItem.key === key) {
              return {
                ...nestedItem,
                isEditing: false,
              };
            }
            return nestedItem;
          }),
        };
      }
      return record;
    });
    setDataSource(updatedDataSource);
  };

  const handleCancel = (key: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          return {
            ...record,
            isEditing: false,
          };
        }
        if (record.nestedData) {
          return {
            ...record,
            nestedData: record.nestedData.map((nestedItem) => ({
              ...nestedItem,
              isEditing: false,
            })),
          };
        }
        return record;
      })
    );
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
      status: "",
      block: null,
      rate: undefined,
      effectiveDate: "",
      isEditing: true,
      createdBy: "",
      createDate: "",
      modifiedBy: "",
      modifiedDate: "",
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

  const renderText = (text: ReactNode) => {
    if (typeof text === "object" && text !== null) {
      if (text.hasOwnProperty("value") && text.hasOwnProperty("offset")) {
        const { value, offset } = text as unknown as {
          value: string;
          offset: number;
        };
        const date = new Date(value);
        date.setMinutes(date.getMinutes() - offset);
        const adjustedDate = date.toISOString().split("T")[0];
        return adjustedDate;
      }
      return JSON.stringify(text);
    }
    return <span style={{ color: theme.colorText }}>{text}</span>;
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
              <ProFormDatePicker disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return renderText(text);
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
              <ProFormDigit disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return renderText(text);
      },
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
          {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_, record) => {
              const hasNestedRecords = record.nestedData?.length > 0;

              if (record.isEditing) {
                return (
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => handleSave(record.key)}
                    >
                      Save
                    </Button>
                    <Button onClick={() => handleCancel(record.key)}>
                      Cancel
                    </Button>
                  </Space>
                );
              }

              return (
                <Space>
                  {hasNestedRecords && (
                    <Button
                      type="primary"
                      onClick={() => handleEdit(record.key, record)}
                    >
                      Edit
                    </Button>
                  )}
                  {hasNestedRecords && (
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(undefined, record)}
                    >
                      Delete
                    </Button>
                  )}
                </Space>
              );
            },
          },
        ]
      : []),
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
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
      render: (text, nestedRecord) => {
        if (nestedRecord.isEditing) {
          return (
            <Form.Item
              name={[`${nestedRecord.key}`, "status"]}
              initialValue={nestedRecord.status}
              rules={[{ required: true }]}
            >
              <Input disabled={!nestedRecord.isEditing} />
            </Form.Item>
          );
        }
        return renderText(text);
      },
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text, nestedRecord) => {
        if (nestedRecord.isEditing) {
          return (
            <Form.Item
              name={[`${nestedRecord.key}`, "block"]}
              initialValue={nestedRecord.block}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && (value[0] === null || value[1] === null)) {
                      return Promise.reject(
                        new Error("Please input both block values.")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <ProFormText
                fieldProps={{
                  type: "number",
                  precision: 2,
                }}
                disabled={!nestedRecord.isEditing}
                placeholder="Block"
              />
            </Form.Item>
          );
        }
        return renderText(text);
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, nestedRecord) => {
        if (nestedRecord.isEditing) {
          return (
            <Form.Item
              name={[`${nestedRecord.key}`, "rate"]}
              initialValue={nestedRecord.rate}
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input a valid rate.",
                },
              ]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!nestedRecord.isEditing}
              />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme.colorText }}>
            {typeof nestedRecord.rate === "number"
              ? `RM ${nestedRecord.rate.toFixed(2)}/m³`
              : ""}
          </span>
        );
      },
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
          {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_, nestedRecord) => {
              const hasNestedRecords =
                nestedRecord.nestedData && nestedRecord.nestedData.length > 0;

              if (nestedRecord.isEditing) {
                return (
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => handleSave(nestedRecord.key)}
                    >
                      Save
                    </Button>
                    <Button onClick={() => handleCancel(nestedRecord.key)}>
                      Cancel
                    </Button>
                  </Space>
                );
              }

              return (
                <Space>
                  {hasNestedRecords && (
                    <Button
                      type="primary"
                      onClick={() => handleEdit(nestedRecord.key, nestedRecord)}
                    >
                      Edit
                    </Button>
                  )}
                  {hasNestedRecords && (
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(nestedRecord, undefined)}
                    >
                      Delete
                    </Button>
                  )}
                </Space>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Form form={formRef.current}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          search={false}
          headerTitle={
            <span
              style={{
                fontFamily: theme.fontFamily,
              }}
            >
              Tariff Charges Maintenance
            </span>
          }
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
            expandedRowKeys,
            onExpandedRowsChange: (expandedRows) => {
              setExpandedRowKeys(expandedRows as React.Key[]);
            },
            expandedRowRender: (record) => {
              const nestedRecord = dataSource.find(
                (item) => item.key === record.key
              );
              const nestedData = nestedRecord?.nestedData || [];

              return (
                <Form form={nestedFormRef.current}>
                  <ProTable<NestedDataType>
                    columns={nestedColumns}
                    dataSource={nestedData}
                    rowKey="key"
                    search={false}
                    pagination={false}
                    size="small"
                    toolbar={{
                      actions: [
                        <Button
                          key="add"
                          type="primary"
                          onClick={() => handleAddAdditionalRow(record.key)}
                        >
                          Add
                        </Button>,
                      ],
                    }}
                  />
                </Form>
              );
            },
          }}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
