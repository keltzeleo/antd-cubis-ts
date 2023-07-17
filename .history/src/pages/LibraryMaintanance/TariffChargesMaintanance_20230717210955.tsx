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
  nestedKey?: React.Key; // Add the nestedKey property
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
    // Initial data source...
  ]);

  const [editingRecordKey, setEditingRecordKey] = useState<React.Key | null>(
    null
  );
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
            ...formValues[record.key],
            nestedData: record.nestedData?.map((nestedItem) => {
              const matchingItem =
                updatedNestedData[`${record.key}-${nestedItem.key}`];
              return {
                ...nestedItem,
                ...(matchingItem || {}),
                isEditing: false,
                rate:
                  matchingItem?.rate !== undefined
                    ? matchingItem.rate
                    : nestedItem.rate,
              };
            }),
            effectiveDate: {
              value: formValues[record.key]?.effectiveDate,
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

      const savedItems = [];
      const mainRecord = updatedDataSource.find((item) => item.key === key);
      if (mainRecord) {
        savedItems.push(`Main Record ${mainRecord.key}`);

        if (mainRecord.nestedData) {
          mainRecord.nestedData.forEach((nestedItem) => {
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
    // Columns definition...
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    // Nested columns definition...
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
