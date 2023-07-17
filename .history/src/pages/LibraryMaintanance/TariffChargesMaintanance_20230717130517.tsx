import { DeleteOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
} from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Space,
  notification,
} from "antd";
import React, { ReactNode, useRef, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  status: string;
  block?: [number, number] | null;
  rate?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: React.Key;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  effectiveDate?: string;
  isEditing?: boolean;
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
          key: "1-1",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-2",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "2023-07-01",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "1-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "2023-07-01",
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
          key: "2-1",
          status: "Applied",
          block: [0, 10],
          rate: 0.05,
          effectiveDate: "2023-07-01",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ]);

  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );

  const [editingMainRecordKey, setEditingMainRecordKey] = useState<React.Key | null>(null);

  const [nestedEditingRecordKey, setNestedEditingRecordKey] =
    useState<React.Key | null>(null);

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const formRef = useRef<FormInstance<any>>(Form.useForm()[0]);
  const nestedFormRef = useRef<FormInstance<any>>(Form.useForm()[0]);
  const [newRowValues, setNewRowValues] = useState<Partial<NestedDataType>>({});

  const handleChangeNewRow = (fieldName: string, value: any) => {
    setNewRowValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEdit = (recordKey: React.Key | null, mainRecord: TariffChargesDataType) => {
    setNestedEditingRecordKey(recordKey);
    setEditingMainRecordKey(mainRecord.key); // Store the current main record key
    ) => {
    setNestedEditingRecordKey(recordKey);

    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => ({
        ...item,
        isEditing: item.key === mainRecord.key,
        nestedData:
          item.key === mainRecord.key
            ? item.nestedData?.map((nestedItem) => ({
                ...nestedItem,
                isEditing: true,
              }))
            : item.nestedData,
      }))
    );

    setExpandedRowKeys((prevExpandedRowKeys) => [
      ...prevExpandedRowKeys,
      mainRecord.key,
    ]);
  };

  const handleSave = async (key: React.Key) => {
    try {
      await formRef.current?.validateFields();

      const updatedNestedData = nestedFormRef.current?.getFieldsValue();

      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          const formValues = formRef.current?.getFieldsValue();
          const updatedRecord = {
            ...record,
            ...formValues?.[record.key],
            nestedData: record.nestedData?.map((nestedItem) => {
              const nestedFormValues = nestedFormRef.current?.getFieldsValue();
              const updatedNestedItem = {
                ...nestedItem,
                ...nestedFormValues?.[`${record.key}-${nestedItem.key}`],
                isEditing: false,
              };
              return updatedNestedItem;
            }),
            effectiveDate: {
              value: formValues?.[record.key]?.effectiveDate,
              offset: new Date().getTimezoneOffset(),
            },
            isEditing: false,
          };

          return updatedRecord;
        }

        return record;
      });

      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
      setExpandedRowKeys([key]);

      // Refresh data here, if applicable
      // displaySuccessMessage("Data saved successfully."); // Display success message, if needed
      notification.success({
        message: "Data saved successfully.",
      });
    } catch (error) {
      console.error("Save error:", error);
      // displayErrorMessage("Failed to save data. Please try again.");
      notification.error({
        message: "Failed to save data. Please try again.",
        description: (error as Error).message,
      });
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

    setExpandedRowKeys((prevExpandedRowKeys) => {
      if (prevExpandedRowKeys.includes(key)) {
        return prevExpandedRowKeys;
      } else {
        return [...prevExpandedRowKeys, key];
      }
    });
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
          <span style={{ color: theme.colorText }}>
            {text ? renderText(text) : ""}
          </span>
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

        return <span style={{ color: theme.colorText }}>RM {text}</span>;
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
        ]
      : []),
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        const hasNestedRecords =
          record.nestedData && record.nestedData.length > 0;

        if (record.isEditing) {
          return (
            <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
              <Button type="primary" onClick={() => handleSave(record.key)}>
                Save
              </Button>
              <Button onClick={() => handleCancel(record.key)}>Cancel</Button>
              {hasNestedRecords && (
                <Button
                  type="primary"
                  onClick={() => handleAddAdditionalRow(record.key)}
                >
                  Add Additional Row
                </Button>
              )}
            </Space>
          );
        }

        return (
          <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
            {hasNestedRecords && (
              <Button
                type="primary"
                onClick={() =>
                  handleEdit(record.key, record as TariffChargesDataType)
                }
              >
                Edit
              </Button>
            )}
            {hasNestedRecords && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  handleDelete(undefined, record as TariffChargesDataType)
                }
              >
                Delete
              </Button>
            )}
          </Space>
        );
      },
    },
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
      render: renderText,
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "block"]}
              initialValue={record.block}
              rules={[
                { required: true },
                () => ({
                  validator(_, value) {
                    if (!value || value[0] < value[1]) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The start of the block must be less than the end!"
                      )
                    );
                  },
                }),
              ]}
            >
              <ProFormDigitRange
                fieldProps={{ precision: 0 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme.colorText }}>
            {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
          </span>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      valueType: "digit",
      key: "rate",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "rate"]}
              initialValue={record.rate}
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input a valid rate.",
                  required: true,
                },
              ]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme.colorText }}>
            RM {record.rate ? renderText(record.rate.toFixed(2)) : ""} /m³
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
                    expandedRowKeys={expandedRowKeys}
                    onExpandedRowsChange={(expandedRows) => {
                      setExpandedRowKeys(expandedRows as React.Key[]);
                    }}
                    editable={{
                      type: "multiple",
                      editableKeys: nestedEditingRecordKey
                        ? [nestedEditingRecordKey]
                        : [],
                      onSave: async (rowKey, row) => {
                        const updatedNestedData = dataSource.map((item) => {
                          if (item.key === record.key) {
                            return {
                              ...item,
                              nestedData: item.nestedData?.map((nestedItem) =>
                                nestedItem.key === rowKey
                                  ? { ...nestedItem, ...row }
                                  : nestedItem
                              ),
                            };
                          }
                          return item;
                        });
                        setDataSource(updatedNestedData);
                        setNestedEditingRecordKey(null);
                      },
                      onChange: (editableKeys, editableRows) => {
                        const updatedMainDataSource = dataSource.map((record) => {
                          if (record.key === editingMainRecordKey) { // Access the stored main record key
                            return {
                              ...record,
                              nestedData: Array.isArray(editableRows)
                                ? editableRows.map((nestedItem) => {
                                    const matchingItem =
                                      nestedFormRef.current?.getFieldValue(
                                        `${record.key}-${nestedItem.key}`
                                      );
                                    return {
                                      ...nestedItem,
                                      ...(matchingItem || {}),
                                    };
                                  })
                                : [],
                            };
                          }
                          return record;
                        });
                        setDataSource(updatedMainDataSource);
                      },
                    },                    }}
                  />
                </Form>
              );
            },
            rowExpandable: () => true,
          }}
          bordered={false}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
