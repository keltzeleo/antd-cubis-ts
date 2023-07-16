import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
} from "@ant-design/pro-form";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Form, Space } from "antd";
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
  const formRef = useRef<FormInstance<any>>(null);
  const actionRef = useRef<ActionType>();

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEdit = (key: React.Key) => {
    setEditingRecordKey(key);
  };

  const handleDelete = (key: React.Key) => {
    const updatedDataSource = dataSource.filter((record) => record.key !== key);
    setDataSource(updatedDataSource);
  };

  const handleSave = async (key: React.Key) => {
    try {
      await formRef.current?.validateFields();

      const updatedDataSource = dataSource.map((record) => {
        if (record.key === key) {
          const formValues = formRef.current?.getFieldsValue();
          const updatedRecord = {
            ...record,
            ...formValues,
            nestedData: record.nestedData?.map((nestedItem) => {
              const nestedKey = nestedItem.key;
              return {
                ...nestedItem,
                ...formValues[`${key}-${nestedKey}`],
              };
            }),
          };

          return updatedRecord;
        }

        return record;
      });

      setDataSource(updatedDataSource);
      setEditingRecordKey(null);
      actionRef.current?.clearSelected();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const handleCancel = () => {
    setEditingRecordKey(null);
    actionRef.current?.clearSelected();
  };

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const columns: ProColumns<TariffChargesDataType>[] = [
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
      valueType: "date",
      renderFormItem: () => {
        return <ProFormDatePicker />;
      },
      render: renderText,
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      renderFormItem: () => {
        return <ProFormDigit fieldProps={{ precision: 2 }} />;
      },
      render: renderText,
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
        const isEditing = record.key === editingRecordKey;

        if (isEditing) {
          return (
            <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(record.key)}
              >
                Save
              </Button>
              <Button icon={<CloseOutlined />} onClick={() => handleCancel()}>
                Cancel
              </Button>
            </Space>
          );
        }

        return (
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
        );
      },
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
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
      valueType: "digitRange",
      renderFormItem: (_, record) => {
        return <ProFormDigitRange fieldProps={{ precision: 0 }} />;
      },
      render: (_, record) => {
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
      key: "rate",
      valueType: "percent",
      renderFormItem: (_, record) => {
        return (
          <ProFormDigit
            fieldProps={{ precision: 2 }}
            rules={[
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: "Please input a valid rate.",
              },
            ]}
          />
        );
      },
      render: (_, record) => {
        return (
          <span style={{ color: theme.colorText }}>
            {typeof record.rate === "number"
              ? `RM ${record.rate.toFixed(2)}/m³`
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
        ]
      : []),
  ];

  return (
    <>
      <Form form={formRef.current} component={false}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          search={false}
          options={false}
          actionRef={actionRef}
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
          editable={{
            type: "multiple",
            onSave: handleSave,
            onDelete: handleDelete,
          }}
          bordered={true}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
