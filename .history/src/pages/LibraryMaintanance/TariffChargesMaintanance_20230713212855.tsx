import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProFormDigit, ProFormDigitRange } from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, DatePicker, Form, Select, Space } from "antd";
import React, { ReactNode, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: React.Key;
  status: string;
  block: [number, number] | null;
  rate: number;
  effectiveDate: string;
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
  monthlyMinimumCharges: number;
  effectiveDate: string;
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
  const [form] = Form.useForm();
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

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEdit = (
    nestedRecord: NestedDataType | undefined,
    mainRecord: TariffChargesDataType
  ) => {
    if (nestedRecord) {
      form.setFieldsValue({ ...nestedRecord });
      setDataSource((prevDataSource) =>
        prevDataSource.map((item) =>
          item.key === mainRecord.key
            ? {
                ...item,
                nestedData: item.nestedData?.map((nestedItem) =>
                  nestedItem.key === nestedRecord.key
                    ? { ...nestedItem, isEditing: true }
                    : { ...nestedItem, isEditing: false }
                ),
              }
            : item
        )
      );
    } else {
      form.setFieldsValue({ ...mainRecord });
      setDataSource((prevDataSource) =>
        prevDataSource.map((item) =>
          item.key === mainRecord.key
            ? { ...item, isEditing: true }
            : { ...item, isEditing: false }
        )
      );
    }
  };

  const handleDelete = (
    nestedRecord: NestedDataType | undefined,
    mainRecord: TariffChargesDataType
  ) => {
    if (nestedRecord) {
      console.log("Delete nested record", nestedRecord);
      // Handle nested record delete logic here
    } else {
      console.log("Delete main record", mainRecord);
      // Handle main record delete logic here
    }
  };

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const columns: ProColumns<TariffChargesDataType>[] = [
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

      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name={["tariffAbbreviation"]}>
              <Select>
                <Select.Option value="TA">TA</Select.Option>
                <Select.Option value="TB">TB</Select.Option>
                <Select.Option value="TC">TC</Select.Option>
              </Select>
            </Form.Item>
          );
        }
        return renderText(text);
      },
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name={["effectiveDate"]}>
              <DatePicker />
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
              name={["monthlyMinimumCharges"]}
              rules={[{ required: true }]}
            >
              <ProFormDigit fieldProps={{ precision: 2 }} />
            </Form.Item>
          );
        }
        return renderText(text);
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

        return (
          <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
            {hasNestedRecords && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleEdit(undefined, record)}
              >
                Edit
              </Button>
            )}
            {hasNestedRecords && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(undefined, record)}
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
            <Form.Item name={["block"]}>
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
              name={["rate"]}
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
            <Form.Item name={["effectiveDate"]}>
              <DatePicker />
            </Form.Item>
          );
        }
        return renderText(text);
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
      width: 110,
      render: (_, record) => (
        <Space style={{ justifyContent: "space-evenly", width: "100%" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() =>
              handleEdit(
                record,
                dataSource.find((item) =>
                  item.nestedData?.find(
                    (nestedItem) => nestedItem.key === record.key
                  )
                ) || ({} as TariffChargesDataType)
              )
            }
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              handleDelete(
                record,
                dataSource.find((item) =>
                  item.nestedData?.find(
                    (nestedItem) => nestedItem.key === record.key
                  )
                ) || ({} as TariffChargesDataType)
              )
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="tariffCode"
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
            expandedRowRender: (record) => (
              <ProTable<NestedDataType>
                columns={nestedColumns}
                dataSource={record.nestedData}
                rowKey="key"
                search={false}
                pagination={false}
              />
            ),
            rowExpandable: (record) => !!record.nestedData,
          }}
          bordered={false}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
