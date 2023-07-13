import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProFormDigit } from "@ant-design/pro-form";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, DatePicker, Form, Space, message } from "antd";
import React, { ReactNode, useState } from "react";

import { ConfigProvider } from "antd";

// interface Theme {
//   [key: string]: string;
// }

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
  theme: any;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const {
    theme: { colorBgContainer },
  } = theme.useToken();
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

  const handleAdd = (record: TariffChargesDataType) => {
    console.log("Add record", record);
    // Handle add logic here
  };

  const handleEdit = (record: NestedDataType) => {
    form.setFieldsValue({ ...record });
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) =>
        item.key === record.key
          ? { ...item, isEditing: true }
          : { ...item, isEditing: false }
      )
    );
  };

  const handleSave = (record: NestedDataType) => {
    form.validateFields().then((values) => {
      // Do your API calls here with values
      // reset isEditing state
      setDataSource((dataSource) =>
        dataSource.map((item) =>
          item.key === record.key
            ? { ...item, ...values, isEditing: false }
            : item
        )
      );
      message.success("Record updated successfully.");
    });
  };

  const handleDelete = (record: NestedDataType) => {
    console.log("Delete record", record);
    // Handle delete logic here
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
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name={["nestedData", record.key, "effectiveDate"]}>
              <DatePicker />
            </Form.Item>
          );
        }
        return renderText(text);
      },
      valueType: "text", // Set the valueType to "text" to disable editing
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            readonly: true,
            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            readonly: true,

            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            readonly: true,

            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            readonly: true,

            render: renderText,
          },
        ]
      : []),
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAdd(record)}>
          Add
        </Button>
      ),
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
      render: (text: ReactNode, record: NestedDataType) => (
        <span style={{ color: theme["colorText"] }}>
          {record.block ? `${record.block[0]} - ${record.block[1]}m³` : ""}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item
              name="rate"
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
            <Form.Item name="effectiveDate">
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
            readonly: true,

            render: renderText,
          },
          {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            readonly: true,

            render: renderText,
          },
          {
            title: "Modified By",
            dataIndex: "modifiedBy",
            key: "modifiedBy",
            readonly: true,

            render: renderText,
          },
          {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            readonly: true,

            render: renderText,
          },
        ]
      : []),

    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ ...theme }}>
      <Form form={form} component={false}>
        <ProTable<TariffChargesDataType>
          columns={columns}
          dataSource={dataSource}
          rowKey="tariffCode"
          search={false}
          headerTitle="Tariff Charges Maintenance"
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
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
