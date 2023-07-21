import { DeleteOutlined } from "@ant-design/icons";
import {
  ProColumns,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
  ProTable,
} from "@ant-design/pro-components";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Space,
  notification,
} from "antd";
import moment from "moment";
import React, { ReactNode, useRef, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
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
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  rate1?: number;
  rate5?: number;
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
      effectiveDate: "07-07-2023",
      createdBy: "John Doe",
      createDate: "07-07-2023",
      modifiedBy: "John Doe",
      modifiedDate: "07-07-2023",
      rate1: 1.23,
      nestedData: [
        {
          key: "1-1",
          status: "Applied",
          block: [0, 10],
          rate: 2,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "1-2",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "1-3",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
      ],
    },
    {
      key: "2",
      tariffCode: "TAR-002",
      tariffAbbreviation: "TB",
      monthlyMinimumCharges: 150,
      effectiveDate: "07-07-2023",
      createdBy: "Jane Smith",
      createDate: "07-07-2023",
      modifiedBy: "Jane Smith",
      modifiedDate: "07-07-2023",
      rate1: 1.13,
      nestedData: [
        {
          key: "2-1",
          status: "Applied",
          block: [0, 20],
          rate: 0.05,
          effectiveDate: "07-07-2023",
          createdBy: "Jane Smith",
          createDate: "07-07-2023",
          modifiedBy: "Jane Smith",
          modifiedDate: "07-07-2023",
        },
        {
          key: "2-2",
          status: "Applied",
          block: [21, 30],
          rate: 0.18,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
        {
          key: "2-3",
          status: "Pending",
          block: [31, 100],
          rate: 0.23,
          effectiveDate: "07-07-2023",
          createdBy: "John Doe",
          createDate: "07-07-2023",
          modifiedBy: "John Doe",
          modifiedDate: "07-07-2023",
        },
      ],
    },
  ]);

  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );
  const [nestedEditingRecordKey, setNestedEditingRecordKey] =
    useState<React.Key | null>(null);

  const [nestedExpandedRowKeys, setNestedExpandedRowKeys] = useState<
    React.Key[]
  >([]);

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

  const handleNestedTableChange = (
    recordKey: React.Key,
    nestedData: NestedDataType[]
  ) => {
    setDataSource((prevDataSource) => {
      const updatedDataSource = prevDataSource.map((record) => {
        if (record.key === recordKey) {
          return {
            ...record,
            nestedData: [...nestedData],
          };
        }
        return record;
      });
      return updatedDataSource;
    });
  };

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEdit = (
    recordKey: React.Key | null,
    mainRecord: TariffChargesDataType
  ) => {
    setNestedEditingRecordKey(recordKey);
    console.log("main record" + mainRecord.nestedData[0].rate);
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

    setNestedExpandedRowKeys([mainRecord.key]);
  };

  const handleSave = async (key: React.Key) => {
    try {
      await formRef.current?.validateFields();

      const updatedNestedData = nestedFormRef.current?.getFieldsValue();

      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          const formValues = formRef.current?.getFieldsValue();

          // Convert the effectiveDate to the desired format
          const effectiveDate = formValues?.[record.key]?.effectiveDate;
          const effectiveDateString = effectiveDate
            ? effectiveDate.format("DD-MM-YYYY")
            : undefined;

          const updatedRecord = {
            ...record,
            ...formValues?.[record.key],
            nestedData: record.nestedData?.map((nestedItem) => {
              const matchingItem =
                updatedNestedData?.[`${record.key}-${nestedItem.key}`];
              return {
                ...nestedItem,
                ...(matchingItem || {}),
                isEditing: false,
                rate:
                  matchingItem?.rate !== undefined
                    ? Number(matchingItem.rate)
                    : nestedItem.rate,
                block: matchingItem?.block || nestedItem.block, // This line updates the block consumption value
              };
            }),
            effectiveDate: effectiveDateString, // Use the string date
            isEditing: false,
          };

          return updatedRecord;
        }
        return record;
      });

      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
      setExpandedRowKeys([key]);
      setExpandedRowKeys([key]);
      setNestedExpandedRowKeys([key]);

      const savedItems = [];
      const mainRecord = updatedDataSource.find((item) => item.key === key);
      if (mainRecord) {
        savedItems.push(`Main Record ${mainRecord.key}`);

        if (mainRecord.nestedData) {
          mainRecord.nestedData.forEach((nestedItem: { key: any }) => {
            savedItems.push(
              `Nested Record ${nestedItem.key} (Main Record ${mainRecord.key})`
            );
          });
        }
      }

      notification.success({
        message: "Data saved successfully.",
        description: `Saved items: ${savedItems.join(", ")}`,
      });
    } catch (error) {
      console.error("Save error:", error);
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
      const updatedDataSource = dataSource.map((record) => {
        if (record.key === mainRecord.key) {
          const updatedNestedData = record.nestedData?.filter(
            (item) => item.key !== nestedRecord.key
          );
          return {
            ...record,
            nestedData: updatedNestedData,
          };
        }
        return record;
      });
      setDataSource(updatedDataSource);
    } else if (mainRecord) {
      const updatedDataSource = dataSource.filter(
        (record) => record.key !== mainRecord.key
      );
      setDataSource(updatedDataSource);
    }
  };

  const handleAddAdditionalRow = (recordKey: React.Key) => {
    const currentDate = new Date();
    const currentDateString = `${("0" + currentDate.getDate()).slice(-2)}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${currentDate.getFullYear()}`;

    const newData: NestedDataType = {
      key: generateUniqueKey(),
      status: "",
      block: null,
      rate: undefined,
      effectiveDate: "",
      isEditing: true,
      createdBy: "",
      createDate: currentDateString,
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

  const generateUniqueKey = (): string => {
    const timestamp = new Date().getTime();
    return `new-row-${timestamp.toString()}`;
  };

  const renderText = (text: ReactNode) => {
    if (typeof text === "object" && text !== null) {
      if (text.hasOwnProperty("value") && text.hasOwnProperty("offset")) {
        const { value, offset } = text as unknown as {
          value: string;
          offset: number;
        };

        // Check if value is a string before calling split function
        if (typeof value === "string") {
          const dateArray = value.split("-");
          const date = new Date(
            +dateArray[0],
            +dateArray[1] - 1,
            +dateArray[2]
          );
          date.setMinutes(date.getMinutes() - offset);
          const adjustedDate = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${date.getFullYear()}`;
          return adjustedDate;
        } else if (moment.isMoment(value)) {
          // If value is a moment object, return its string representation
          return (value as moment.Moment).format("DD-MM-YYYY");
        } else {
          // Return a default value or handle the non-string case
          return JSON.stringify(value);
        }
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
              initialValue={
                typeof text === "string" ? moment(text, "DD-MM-YYYY") : null
              }
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
    {
      title: "Block Consumption 1",
      dataIndex: "nestedData",
      key: "blockConsumption1",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "blockConsumption1"]}
              initialValue={record.nestedData?.[0]?.block}
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
        } else {
          return (
            <span style={{ color: theme.colorText }}>
              {record.nestedData?.[0]?.block
                ? `${record.nestedData[0].block[0]} - ${record.nestedData[0].block[1]}m³`
                : ""}
            </span>
          );
        }
      },
    },
    {
      title: "Rate 1",
      dataIndex: "rate1",
      key: "rate1",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate1"]}
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
    // Block column
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "block"]} // corrected here
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
        } else {
          return (
            <span style={{ color: theme.colorText }}>
              {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
            </span>
          );
        }
      },
    },
    {
      title: "Rate",
      dataIndex: "rate5",
      key: "rate5",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate5"]}
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
              const nestedData = record.nestedData || [];

              return (
                <Form form={nestedFormRef.current}>
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
                      // Block column
                      {
                        title: "Block",
                        dataIndex: "block",
                        key: "block",
                        render: (text, nestedRecord) => {
                          if (nestedRecord.isEditing) {
                            return (
                              <Form.Item
                                name={[
                                  `${record.key}-${nestedRecord.key}`,
                                  "block",
                                ]}
                                initialValue={nestedRecord.block}
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
                                  disabled={!nestedRecord.isEditing}
                                />
                              </Form.Item>
                            );
                          } else {
                            return (
                              <span style={{ color: theme.colorText }}>
                                {nestedRecord.block
                                  ? `${nestedRecord.block[0]} - ${nestedRecord.block[1]}m³`
                                  : ""}
                              </span>
                            );
                          }
                        },
                      },
                      // Rate column
                      {
                        title: "Rate",
                        dataIndex: "rate5",
                        key: "rate5",
                        render: (text, record) => {
                          if (record.isEditing) {
                            return (
                              <Form.Item
                                name={[record.key, "rate5"]}
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

                          return (
                            console.log(record),
                            (
                              <span style={{ color: theme.colorText }}>
                                RM {record.rate}
                              </span>
                            )
                          );
                        },
                      },

                      {
                        title: "Effective Date (from)",
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
                    ]}
                    dataSource={nestedData}
                    rowKey="key"
                    search={false}
                    pagination={false}
                    editable={{
                      type: "multiple",
                    }}
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
