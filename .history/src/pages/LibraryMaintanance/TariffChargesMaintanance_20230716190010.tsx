import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Form, FormInstance } from "antd";
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
  isEditing?: boolean;
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
    // Existing columns...
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    // Existing nested columns...
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
      {dataSource.length === 0 && (
        <Button type="primary" onClick={() => handleAddAdditionalRow("new")}>
          Add Row
        </Button>
      )}
    </>
  );
};

export default TariffChargesMaintenance;
