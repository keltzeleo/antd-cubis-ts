import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import {
  EditableProTable,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Form, Input, notification } from "antd";
import React, { useRef, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  nestedKey?: React.Key;
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
  const formRef = useRef<any>(null);
  const nestedFormRef = useRef<any>(null);
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    // Existing data source values
  ]);

  const isEditingRecord = (recordKey: React.Key) =>
    recordKey === editingRecordKey;
  const isEditingNestedRecord = (
    recordKey: React.Key,
    nestedRecordKey: React.Key
  ) =>
    recordKey === editingRecordKey &&
    nestedRecordKey === nestedEditingRecordKey;

  const handleSave = (recordKey: React.Key, nestedRecordKey?: React.Key) => {
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
        record.tariffCode = mainTableFormValues.tariffCode;
        record.tariffAbbreviation = mainTableFormValues.tariffAbbreviation;
        record.monthlyMinimumCharges =
          mainTableFormValues.monthlyMinimumCharges;
        record.effectiveDate = mainTableFormValues.effectiveDate;
        record.isEditing = false;
        saveRecord(record);
      }

      const nestedTableFormValues = nestedFormRef.current?.getFieldsValue();
      if (record && record.nestedData) {
        const nestedRecord = record.nestedData.find(
          (nr) => nr.key === nestedRecordKey
        );
        if (nestedRecord) {
          nestedRecord.status = nestedTableFormValues[nestedRecordKey]?.status;
          nestedRecord.block = nestedTableFormValues[nestedRecordKey]?.block;
          nestedRecord.rate = nestedTableFormValues[nestedRecordKey]?.rate;
          nestedRecord.effectiveDate =
            nestedTableFormValues[nestedRecordKey]?.effectiveDate;
          nestedRecord.isEditing = false;
          saveNestedRecord(nestedRecord);
        }
      }

      setDataSource([...dataSource]);

      notification.success({
        message: "Changes saved successfully",
        description: `Main Record: ${recordKey}, Nested Record: ${nestedRecordKey}`,
      });
    });
  };

  const handleCancel = (recordKey: React.Key, nestedRecordKey?: React.Key) => {
    if (nestedRecordKey) {
      const record = dataSource.find((r) => r.key === recordKey);
      if (record && record.nestedData) {
        const nestedRecord = record.nestedData.find(
          (nr) => nr.key === nestedRecordKey
        );
        if (nestedRecord) {
          nestedRecord.isEditing = false;
        }
      }
    } else {
      const record = dataSource.find((r) => r.key === recordKey);
      if (record) {
        record.isEditing = false;
      }
    }

    formRef.current?.resetFields();
    nestedFormRef.current?.resetFields();

    setDataSource([...dataSource]);
  };

  const handleDelete = (recordKey: React.Key, nestedRecordKey?: React.Key) => {
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

  const handleAddNestedRow = (recordKey: React.Key) => {
    const record = dataSource.find((r) => r.key === recordKey);
    if (record) {
      const newNestedRecord: NestedDataType = {
        key: `${recordKey}-${
          record.nestedData ? record.nestedData.length + 1 : 1
        }`,
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
      record.nestedData = record.nestedData
        ? [...record.nestedData, newNestedRecord]
        : [newNestedRecord];
    }

    setDataSource([...dataSource]);
  };

  const handleEdit = (recordKey: React.Key, nestedRecordKey?: React.Key) => {
    if (nestedRecordKey) {
      const record = dataSource.find((r) => r.key === recordKey);
      if (record && record.nestedData) {
        const nestedRecord = record.nestedData.find(
          (nr) => nr.key === nestedRecordKey
        );
        if (nestedRecord) {
          nestedRecord.isEditing = true;
        }
      }
    } else {
      const record = dataSource.find((r) => r.key === recordKey);
      if (record) {
        record.isEditing = true;
      }
    }

    setDataSource([...dataSource]);
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
        <EditableTable
          dataSource={record.nestedData}
          onSave={handleSave}
          onCancel={handleCancel}
          onAddRow={() => handleAddNestedRow(record.key)}
          isEditing={(recordKey) =>
            isEditingNestedRecord(record.key, recordKey)
          }
        />
      );
    }

    return null;
  };

  const renderMainTableColumns = () => {
    return columns.map((column) => {
      if (
        column.dataIndex === "tariffCode" ||
        column.dataIndex === "tariffAbbreviation" ||
        column.dataIndex === "monthlyMinimumCharges" ||
        column.dataIndex === "effectiveDate"
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
      if (
        column.dataIndex === "status" ||
        column.dataIndex === "block" ||
        column.dataIndex === "rate" ||
        column.dataIndex === "effectiveDate"
      ) {
        return {
          ...column,
          render: (_, record) => {
            if (isEditingNestedRecord(record.nestedKey, record.key)) {
              return column.render(_, record);
            }
            return renderText(record[column.dataIndex]);
          },
        };
      }
      return column;
    });
  };

  const handleToggleColumns = () => {
    setShowAdditionalColumns(!showAdditionalColumns);
  };

  const handleChangeNewRow = (values: any) => {
    // Handle change in new row values
  };

  const renderText = (text: string | number | Date) => {
    // Render and format text based on the theme
    return text.toString();
  };

  const columns: ProColumns<TariffChargesDataType>[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="tariffCode"
              initialValue={record.tariffCode}
              rules={[{ required: true, message: "Please enter tariff code" }]}
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
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="tariffAbbreviation"
              initialValue={record.tariffAbbreviation}
              rules={[
                { required: true, message: "Please enter tariff abbreviation" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.tariffAbbreviation);
      },
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      width: 180,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="monthlyMinimumCharges"
              initialValue={record.monthlyMinimumCharges}
              rules={[
                {
                  required: true,
                  message: "Please enter monthly minimum charges",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          );
        }
        return renderText(record.monthlyMinimumCharges);
      },
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="effectiveDate"
              initialValue={record.effectiveDate}
              rules={[
                { required: true, message: "Please enter effective date" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.effectiveDate);
      },
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => {
        if (record.isEditing) {
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
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "status"]}
              initialValue={record.status}
              rules={[{ required: true, message: "Please enter status" }]}
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
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "block"]}
              initialValue={record.block}
              rules={[{ required: true, message: "Please enter block" }]}
            >
              <Input />
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
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate"]}
              initialValue={record.rate}
              rules={[{ required: true, message: "Please enter rate" }]}
            >
              <Input type="number" />
            </Form.Item>
          );
        }
        return renderText(record.rate);
      },
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      width: 150,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "effectiveDate"]}
              initialValue={record.effectiveDate}
              rules={[
                { required: true, message: "Please enter effective date" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return renderText(record.effectiveDate);
      },
    },
    {
      title: "Actions",
      width: 100,
      render: (_, record) => {
        if (record.isEditing) {
          return (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(record.nestedKey, record.key)}
              >
                Save
              </Button>
              <Button
                onClick={() => handleCancel(record.nestedKey, record.key)}
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
              onClick={() => handleEdit(record.nestedKey, record.key)}
            >
              Edit
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.nestedKey, record.key)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Form ref={formRef}>
        <ProTable<TariffChargesDataType>
          columns={renderMainTableColumns()}
          dataSource={dataSource}
          rowKey={(record) => record.key}
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
            editableKeys: editingRecordKey ? [editingRecordKey] : [],
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
