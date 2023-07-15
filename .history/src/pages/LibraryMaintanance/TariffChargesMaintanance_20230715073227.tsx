import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  EditableProTable,
  ProFormDatePicker,
  ProFormDigit,
} from "@ant-design/pro-components";
import { Button, Checkbox, Form, Space } from "antd";
import React, { ReactNode, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  status: string;
  block?: [number, number] | null;
  rate?: number;
  effectiveDate?: string;
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
    // Initial data...
  ]);

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleSave = async (row: TariffChargesDataType) => {
    // Save the updated row data
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const handleDelete = (key: React.Key) => {
    // Delete the row with the specified key
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns: any[] = [
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      key: "tariffCode",
      readonly: true,
      render: renderText,
    },
    {
      title: "Tariff Abbreviation",
      dataIndex: "tariffAbbreviation",
      key: "tariffAbbreviation",
      readonly: true,
      render: renderText,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name={[record.key, "effectiveDate"]}>
              <ProFormDatePicker />
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
              rules={[{ required: true }]}
            >
              <ProFormDigit fieldProps={{ precision: 2 }} />
            </Form.Item>
          );
        }
        return renderText(text);
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
        <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (key: React.Key) => {
    // Set the isEditing flag for the corresponding row
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, isEditing: true };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleCancel = (key: React.Key) => {
    // Reset the isEditing flag for the corresponding row
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, isEditing: false };
      }
      return item;
    });
    setDataSource(newData);
  };

  const editableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      render: (_, record) => {
        if (record.isEditing) {
          // Render editable fields for editing
          return renderEditableField(col, record);
        }
        return renderText(col.render ? col.render(_, record) : _);
      },
    };
  });

  const renderEditableField = (column: any, record: any) => {
    const dataIndex = column.dataIndex;
    const title = column.title;
    const initialValue = record[dataIndex];

    return (
      <Form.Item
        name={[record.key, dataIndex]}
        initialValue={initialValue}
        rules={[
          {
            required: true,
            message: `Please input ${title}!`,
          },
        ]}
      >
        {getColumnEditor(column, record)}
      </Form.Item>
    );
  };

  const getColumnEditor = (column: any, record: any) => {
    const dataIndex = column.dataIndex;

    switch (dataIndex) {
      case "effectiveDate":
        return <ProFormDatePicker />;
      case "monthlyMinimumCharges":
        return <ProFormDigit fieldProps={{ precision: 2 }} />;
      // Add cases for other editable columns...

      default:
        return null;
    }
  };

  return (
    <Form component={false}>
      <EditableProTable<TariffChargesDataType>
        rowKey="key"
        headerTitle="Tariff Charges Maintenance"
        columns={editableColumns}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={false}
        editable={{
          type: "multiple",
          editableKeys: dataSource
            .filter((item) => item.isEditing)
            .map((item) => item.key),
          onSave: handleSave,
          onCancel: handleCancel,
          actionRender: (row, config, defaultDoms) => [
            ...defaultDoms,
            row.isEditing ? (
              <a key="cancel" onClick={() => config.onCancel?.(row)}>
                <CloseOutlined />
              </a>
            ) : (
              <a key="edit" onClick={() => config.onEdit?.(row)}>
                <EditOutlined />
              </a>
            ),
          ],
          deletePopconfirmMessage: "Are you sure to delete this record?",
        }}
      />
      <Checkbox
        checked={showAdditionalColumns}
        onChange={(e) => handleToggleColumns(e.target.checked)}
      >
        Show Additional Columns
      </Checkbox>
    </Form>
  );
};

export default TariffChargesMaintenance;
