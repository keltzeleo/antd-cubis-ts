import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  EditableProTable,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
} from "@ant-design/pro-form";
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
    {
      key: "43743809",
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
          key: "43756809",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "04/07/2020",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "43748889",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: "04/07/2023",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "43749022",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: "04/07/2024",
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      key: "99743809",
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
          key: "99799909",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: "04/07/2020",
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ]);

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleSave = async (row: TariffChargesDataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const handleDelete = (key: React.Key) => {
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

  const nestedColumns: any[] = [
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
      render: (text: ReactNode, record: NestedDataType) => {
        if (record.isEditing) {
          return (
            <Form.Item name={[record.key, "block"]} initialValue={record.block}>
              <ProFormDigitRange fieldProps={{ precision: 0 }} />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme["colorText"] }}>
            {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
          </span>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name={[record.key, "rate"]}
              initialValue={record.rate}
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input a valid rate.",
                },
              ]}
            >
              <ProFormDigit fieldProps={{ precision: 2 }} />
            </Form.Item>
          );
        }
        return (
          <span style={{ color: theme["colorText"] }}>
            {typeof text === "number" ? `RM ${text.toFixed(2)}/m³` : ""}
          </span>
        );
      },
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
            onClick={() => handleNestedEdit(record.key)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleNestedDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (key: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) =>
        item.key === key ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleCancel = (key: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) =>
        item.key === key ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleNestedEdit = (mainRecordKey: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((mainRecord) => {
        if (mainRecord.key === mainRecordKey) {
          return {
            ...mainRecord,
            nestedData: mainRecord.nestedData?.map((nestedRecord) => ({
              ...nestedRecord,
              isEditing: true,
            })),
          };
        }
        return mainRecord;
      })
    );
  };

  const handleNestedCancel = (mainRecordKey: React.Key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((mainRecord) => {
        if (mainRecord.key === mainRecordKey) {
          return {
            ...mainRecord,
            nestedData: mainRecord.nestedData?.map((nestedRecord) => ({
              ...nestedRecord,
              isEditing: false,
            })),
          };
        }
        return mainRecord;
      })
    );
  };

  const handleNestedSave = (
    mainRecordKey: React.Key,
    nestedRecordKey: React.Key
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((mainRecord) => {
        if (mainRecord.key === mainRecordKey) {
          return {
            ...mainRecord,
            nestedData: mainRecord.nestedData?.map((nestedRecord) =>
              nestedRecord.key === nestedRecordKey
                ? { ...nestedRecord, isEditing: false }
                : nestedRecord
            ),
          };
        }
        return mainRecord;
      })
    );
  };

  const handleNestedDelete = (
    mainRecordKey: React.Key,
    nestedRecordKey: React.Key
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((mainRecord) => {
        if (mainRecord.key === mainRecordKey) {
          return {
            ...mainRecord,
            nestedData: mainRecord.nestedData?.filter(
              (nestedRecord) => nestedRecord.key !== nestedRecordKey
            ),
          };
        }
        return mainRecord;
      })
    );
  };

  return (
    <>
      <EditableProTable<TariffChargesDataType>
        columns={columns}
        recordCreatorProps={false}
        request={async () => ({ data: dataSource })}
        value={dataSource}
        onChange={setDataSource}
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
        expandedRowRender={(record) => {
          return (
            <EditableProTable<NestedDataType>
              columns={nestedColumns}
              recordCreatorProps={false}
              request={async () => ({ data: record.nestedData })}
              value={record.nestedData}
              onChange={(nestedData) => {
                setDataSource((prevDataSource) =>
                  prevDataSource.map((mainRecord) =>
                    mainRecord.key === record.key
                      ? { ...mainRecord, nestedData }
                      : mainRecord
                  )
                );
              }}
              editable={{
                type: "multiple",
                editableKeys:
                  record.nestedData
                    ?.filter((item) => item.isEditing)
                    .map((item) => item.key) || [],
                onSave: (nestedRecord) =>
                  handleNestedSave(record.key, nestedRecord.key),
                onCancel: () => handleNestedCancel(record.key),
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
          );
        }}
        rowKey="key"
        search={false}
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
      />
    </>
  );
};

export default TariffChargesMaintenance;
