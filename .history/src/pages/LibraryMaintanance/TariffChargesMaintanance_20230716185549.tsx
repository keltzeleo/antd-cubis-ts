import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
} from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Form, Input, Space } from "antd";
import React, { ReactNode, useRef, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  status?: string;
  block?: [number, number] | null;
  rate?: number | undefined;
  effectiveDate?: string;
  createdBy?: string;
  createDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
}

interface TariffChargesDataType {
  key: React.Key;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges?: number;
  effectiveDate?: string;
  isEditing?: boolean;
  createdBy?: string;
  createDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([]);
  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const formRef = useRef<FormInstance<any>>(Form.useForm()[0]); // Initialize formRef with a FormInstance

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleAddNewRecord = () => {
    const newRecord: TariffChargesDataType = {
      key: generateUniqueKey(),
      tariffCode: "",
      tariffAbbreviation: "",
      monthlyMinimumCharges: undefined,
      effectiveDate: "",
      isEditing: true,
      createdBy: "",
      createDate: "",
      modifiedBy: "",
      modifiedDate: "",
      nestedData: [],
    };

    setDataSource([newRecord]);
    setEditingRecordKey(newRecord.key);
  };

  const handleEdit = (
    recordKey: React.Key | null,
    mainRecord: TariffChargesDataType
  ) => {
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

      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          const formValues = formRef.current?.getFieldsValue();
          const updatedRecord = {
            ...record,
            ...formValues?.[record.key],
            nestedData: record.nestedData?.map((nestedItem) => ({
              ...nestedItem,
              ...formValues?.[`${record.key}-${nestedItem.key}`],
            })),
            effectiveDate: {
              value: formValues?.[record.key]?.effectiveDate,
              offset: new Date().getTimezoneOffset(), // Store the time zone offset
            },
            isEditing: false,
          };

          return updatedRecord;
        }

        return record;
      });

      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
      setExpandedRowKeys([key]); // Update expandedRowKeys with the key of the main record being saved

      // Refresh data here, if applicable
      // displaySuccessMessage("Data saved successfully."); // Display success message, if needed
    } catch (error) {
      console.log("Save error:", error);
      // displayErrorMessage("Failed to save data. Please try again."); // Display error message, if needed
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

  const handleSaveNested = (recordKey: React.Key) => {
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === recordKey) {
        const updatedNestedData = record.nestedData?.map((nestedItem) => ({
          ...nestedItem,
          isEditing: false,
        }));

        return {
          ...record,
          nestedData: updatedNestedData,
        };
      }

      return record;
    });

    setDataSource(updatedDataSource);
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

  const generateUniqueKey = (): React.Key => {
    // Generate a unique key for the new row (you can implement your own logic here)
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
      return JSON.stringify(text); // Or any other appropriate way to render the object
    }
    return <span style={{ color: theme.colorText }}>{text}</span>;
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "tariffCode"]}
              initialValue={record.tariffCode}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.tariffCode);
      },
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "tariffAbbreviation"]}
              initialValue={record.tariffAbbreviation}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.tariffAbbreviation);
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
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }
        return renderText(text);
      },
    },
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
                onClick={() => handleAddAdditionalRow(record.key)}
              >
                Add Additional Row
              </Button>
            )}
            <Button
              type="primary"
              onClick={() => handleEdit(record.key, record)}
            >
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(undefined, record)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "status"]}
              initialValue={record.status}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.status);
      },
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
              rules={[{ required: true }]}
            >
              <ProFormDigitRange disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return renderText(record.block);
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "rate"]}
              initialValue={record.rate}
              rules={[{ required: true }]}
            >
              <ProFormDigit
                fieldProps={{ precision: 2 }}
                disabled={!record.isEditing}
              />
            </Form.Item>
          );
        }
        return renderText(record.rate);
      },
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[`${record.key}`, "effectiveDate"]}
              initialValue={record.effectiveDate}
              rules={[{ required: true }]}
            >
              <ProFormDatePicker disabled={!record.isEditing} />
            </Form.Item>
          );
        }
        return renderText(record.effectiveDate);
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
              <Button
                type="primary"
                onClick={() => handleSaveNested(record.key)}
              >
                Save
              </Button>
              <Button onClick={() => handleCancel(record.key)}>Cancel</Button>
              <Button danger onClick={() => handleDelete(record, undefined)}>
                Delete
              </Button>
            </Space>
          );
        }

        return (
          <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
            <Button
              type="primary"
              onClick={() => handleEdit(record.key, record)}
            >
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record, undefined)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleAddAdditionalRow = (recordKey: React.Key) => {
    const newData: NestedDataType = {
      key: generateUniqueKey(),
      status: "",
      block: null,
      rate: undefined,
      effectiveDate: "",
      createdBy: "",
      createDate: "",
      modifiedBy: "",
      modifiedDate: "",
    };

    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.key === recordKey) {
          return {
            ...item,
            nestedData: item.nestedData
              ? [...item.nestedData, newData]
              : [newData],
          };
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
    // Generate a unique key for the new row (you can implement your own logic here)
    const timestamp = new Date().getTime();
    return `new-row-${timestamp}`;
  };

  const renderMainTable = () => {
    if (dataSource.length === 0) {
      return (
        <Form.Item>
          <Button type="primary" onClick={handleAddNewRecord}>
            Add New Record
          </Button>
        </Form.Item>
      );
    }

    return (
      <ProTable<TariffChargesDataType>
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys((prevExpandedRowKeys) => [
                ...prevExpandedRowKeys,
                record.key,
              ]);
            } else {
              setExpandedRowKeys((prevExpandedRowKeys) =>
                prevExpandedRowKeys.filter((key) => key !== record.key)
              );
            }
          },
          expandedRowRender: (record) => {
            return (
              <ProTable<NestedDataType>
                dataSource={record.nestedData || []}
                columns={nestedColumns}
                rowKey="key"
                pagination={false}
                search={false}
              />
            );
          },
        }}
      />
    );
  };

  return (
    <>
      <Checkbox
        checked={showAdditionalColumns}
        onChange={(e) => handleToggleColumns(e.target.checked)}
      >
        Show Additional Columns
      </Checkbox>
      <Form form={formRef} component={false}>
        {renderMainTable()}
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
