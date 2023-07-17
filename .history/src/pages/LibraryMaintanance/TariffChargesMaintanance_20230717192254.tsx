import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Form, notification } from "antd";
import React, { useRef, useState } from "react";

interface Theme {
  // Define the theme interface properties
}

interface TariffChargesDataType {
  key: string;
  effectiveDate: string;
  minimumMonthlyCharges: number;
  nestedData?: NestedDataType[];
}

interface NestedDataType {
  key: string;
  block: string;
  rate: number;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const formRef = useRef<any>(null);
  const nestedFormRef = useRef<any>(null);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    {
      key: "1",
      effectiveDate: "2023-01-01",
      minimumMonthlyCharges: 100,
      nestedData: [
        {
          key: "1-1",
          block: "Block A",
          rate: 10,
        },
        {
          key: "1-2",
          block: "Block B",
          rate: 20,
        },
      ],
    },
    {
      key: "2",
      effectiveDate: "2023-02-01",
      minimumMonthlyCharges: 200,
      nestedData: [
        {
          key: "2-1",
          block: "Block C",
          rate: 15,
        },
      ],
    },
  ]);
  const [editingRecordKey, setEditingRecordKey] = useState("");
  const [nestedEditingRecordKey, setNestedEditingRecordKey] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleChangeNewRow = (values: any) => {
    // Handle change in new row values
  };

  const handleNestedTableChange = (
    nestedDataSource: any,
    recordKey: string
  ) => {
    // Handle change in nested table values
  };

  const handleToggleColumns = () => {
    setShowAdditionalColumns(!showAdditionalColumns);
  };

  const handleEdit = (recordKey: string, nestedRecordKey?: string) => {
    if (nestedRecordKey) {
      setEditingRecordKey(recordKey);
      setNestedEditingRecordKey(nestedRecordKey);
    } else {
      setEditingRecordKey(recordKey);
      setNestedEditingRecordKey("");
    }
  };

  const handleSave = (recordKey: string, nestedRecordKey?: string) => {
    const saveRecord = (record: TariffChargesDataType) => {
      // Simulate saving the main table record
      console.log(`Saving main record: ${recordKey}`, record);
    };

    const saveNestedRecord = (nestedRecord: NestedDataType) => {
      // Simulate saving the nested table record
      console.log(`Saving nested record: ${nestedRecordKey}`, nestedRecord);
    };

    formRef.current?.validateFields().then(() => {
      const mainTableFormValues = formRef.current?.getFieldsValue();
      const record = dataSource.find((r) => r.key === recordKey);
      if (record) {
        record.effectiveDate = mainTableFormValues.effectiveDate;
        record.minimumMonthlyCharges =
          mainTableFormValues.minimumMonthlyCharges;
        saveRecord(record);
      }

      const nestedTableFormValues = nestedFormRef.current?.getFieldsValue();
      const updatedNestedData = record?.nestedData?.map((nestedRecord) => {
        if (nestedRecord.key === nestedRecordKey) {
          return {
            ...nestedRecord,
            block: nestedTableFormValues[nestedRecordKey].block,
            rate: nestedTableFormValues[nestedRecordKey].rate,
          };
        }
        return nestedRecord;
      });

      if (updatedNestedData && record) {
        record.nestedData = updatedNestedData;
        saveNestedRecord(
          record.nestedData.find((r) => r.key === nestedRecordKey)
        );
      }

      setDataSource([...dataSource]);

      setEditingRecordKey("");
      setNestedEditingRecordKey("");

      setExpandedRowKeys([recordKey]);

      notification.success({
        message: "Changes saved successfully",
        description: `Main Record: ${recordKey}, Nested Record: ${nestedRecordKey}`,
      });
    });
  };

  const handleCancel = (recordKey: string, nestedRecordKey?: string) => {
    setEditingRecordKey("");
    setNestedEditingRecordKey("");
    formRef.current?.resetFields();
    nestedFormRef.current?.resetFields();
  };

  const handleDelete = (recordKey: string, nestedRecordKey?: string) => {
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === recordKey) {
        if (nestedRecordKey) {
          record.nestedData = record.nestedData?.filter(
            (nestedRecord) => nestedRecord.key !== nestedRecordKey
          );
        } else {
          // Delete the main record
          return null;
        }
      }
      return record;
    });

    setDataSource(updatedDataSource.filter((record) => record !== null));

    setEditingRecordKey("");
    setNestedEditingRecordKey("");
  };

  const handleAddNestedRow = (recordKey: string) => {
    const record = dataSource.find((r) => r.key === recordKey);
    if (record) {
      const newNestedRecord: NestedDataType = {
        key: `${recordKey}-${
          record.nestedData ? record.nestedData.length + 1 : 1
        }`,
        block: "",
        rate: 0,
      };
      record.nestedData = record.nestedData
        ? [...record.nestedData, newNestedRecord]
        : [newNestedRecord];
    }

    setDataSource([...dataSource]);
  };

  const renderText = (text: string | number | Date) => {
    // Render and format text based on the theme
    return text.toString();
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Effective Date (from)",
      dataIndex: "effectiveDate",
      width: 150,
      render: (_, record) => {
        if (editingRecordKey === record.key) {
          return (
            <Form.Item
              name="effectiveDate"
              initialValue={record.effectiveDate}
              rules={[
                { required: true, message: "Please enter effective date" },
              ]}
            >
              <input />
            </Form.Item>
          );
        }
        return renderText(record.effectiveDate);
      },
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "minimumMonthlyCharges",
      width: 180,
      render: (_, record) => {
        if (editingRecordKey === record.key) {
          return (
            <Form.Item
              name="minimumMonthlyCharges"
              initialValue={record.minimumMonthlyCharges}
              rules={[
                {
                  required: true,
                  message: "Please enter minimum monthly charges",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          );
        }
        return renderText(record.minimumMonthlyCharges);
      },
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => {
        if (editingRecordKey === record.key) {
          return (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(record.key)}
              >
                Save
              </Button>
              <Button onClick={() => handleCancel(record.key)}>Cancel</Button>
            </>
          );
        }

        return (
          <>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.key)}
            >
              Edit
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.key)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Block",
      dataIndex: "block",
      width: 150,
      render: (_, record) => {
        if (nestedEditingRecordKey === record.key) {
          return (
            <Form.Item
              name={[record.key, "block"]}
              initialValue={record.block}
              rules={[{ required: true, message: "Please enter block" }]}
            >
              <input />
            </Form.Item>
          );
        }
        return renderText(record.block);
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: 150,
      render: (_, record) => {
        if (nestedEditingRecordKey === record.key) {
          return (
            <Form.Item
              name={[record.key, "rate"]}
              initialValue={record.rate}
              rules={[{ required: true, message: "Please enter rate" }]}
            >
              <input type="number" />
            </Form.Item>
          );
        }
        return renderText(record.rate);
      },
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => {
        if (nestedEditingRecordKey === record.key) {
          return (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(editingRecordKey, record.key)}
              >
                Save
              </Button>
              <Button
                onClick={() => handleCancel(editingRecordKey, record.key)}
              >
                Cancel
              </Button>
            </>
          );
        }

        return (
          <>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(editingRecordKey, record.key)}
            >
              Edit
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(editingRecordKey, record.key)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const isEditingRecord = (recordKey: string) => recordKey === editingRecordKey;
  const isEditingNestedRecord = (nestedRecordKey: string) =>
    nestedRecordKey === nestedEditingRecordKey;

  const renderMainTableColumns = () => {
    return columns.map((column) => {
      if (
        column.dataIndex === "effectiveDate" ||
        column.dataIndex === "minimumMonthlyCharges"
      ) {
        return {
          ...column,
          render: (_, record) => {
            if (isEditingRecord(record.key)) {
              return column.render(_, record);
            }
            return renderText(record[column.dataIndex]);
          },
        };
      }
      return column;
    });
  };

  const renderNestedTableColumns = () => {
    return nestedColumns.map((column) => {
      if (column.dataIndex === "block" || column.dataIndex === "rate") {
        return {
          ...column,
          render: (_, record) => {
            if (isEditingNestedRecord(record.key)) {
              return column.render(_, record);
            }
            return renderText(record[column.dataIndex]);
          },
        };
      }
      return column;
    });
  };

  const handleExpand = (_, record) => {
    if (!isEditingRecord(record.key)) {
      const keys = expandedRowKeys.includes(record.key)
        ? expandedRowKeys.filter((key) => key !== record.key)
        : [...expandedRowKeys, record.key];
      setExpandedRowKeys(keys);
    }
  };

  const expandedRowRender = (_, record) => {
    if (record.nestedData) {
      const nestedTableColumns = renderNestedTableColumns();

      return (
        <Form ref={nestedFormRef}>
          <ProTable<NestedDataType>
            columns={nestedTableColumns}
            dataSource={record.nestedData}
            rowKey="key"
            search={false}
            toolBarRender={() => [
              <Button
                key="addNestedRow"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAddNestedRow(record.key)}
              >
                Add Nested Row
              </Button>,
            ]}
            editable={{
              type: "multiple",
              editableKeys: isEditingRecord(record.key)
                ? [nestedEditingRecordKey]
                : [],
              onSave: handleSave,
              onChange: handleNestedTableChange,
              onDelete: handleDelete,
            }}
            actionRef={null}
            rowSelection={false}
            options={false}
            pagination={false}
            dateFormatter="string"
          />
        </Form>
      );
    }

    return null;
  };

  return (
    <div>
      <Form ref={formRef}>
        <ProTable<TariffChargesDataType>
          columns={renderMainTableColumns()}
          dataSource={dataSource}
          rowKey="key"
          expandedRowKeys={expandedRowKeys}
          onExpand={handleExpand}
          expandedRowRender={expandedRowRender}
          search={false}
          toolBarRender={() => [
            <Button
              key="toggleColumns"
              type="primary"
              onClick={handleToggleColumns}
            >
              Toggle Columns
            </Button>,
          ]}
          editable={{
            type: "multiple",
            editableKeys: [editingRecordKey],
            onSave: handleSave,
            onChange: handleChangeNewRow,
            onDelete: handleDelete,
          }}
          actionRef={null}
          rowSelection={false}
          options={false}
          pagination={false}
          dateFormatter="string"
        />
      </Form>
    </div>
  );
};

export default TariffChargesMaintenance;
