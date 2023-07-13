import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-table";
import { Button, Form, message } from "antd";
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
    // Initial data
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

  const handleSave = (key: React.Key, row: NestedDataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    message.success("Record updated successfully.");
  };

  const handleDelete = (record: NestedDataType) => {
    console.log("Delete record", record);
    // Handle delete logic here
  };

  const renderText = (text: ReactNode) => (
    <span style={{ color: theme.colorText }}>{text}</span>
  );

  const nestedColumns = [
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
      render: (text, record) => (
        <span style={{ color: theme["colorText"] }}>
          {typeof text === "number" ? `RM ${text.toFixed(2)}/m³` : ""}
        </span>
      ),
      valueType: "digit",
      editable: true,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: renderText,
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
      dataIndex: "actions",
      valueType: "option",
      render: (_, record) => [
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />,
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        />,
      ],
    },
  ];

  return (
    <Form form={form} component={false}>
      <EditableProTable<NestedDataType>
        rowKey="key"
        headerTitle="Tariff Charges Maintenance"
        columns={nestedColumns}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: "dataSource",
          position: "bottom",
          record: () => ({
            key: Date.now(),
            status: "",
            block: null,
            rate: 0,
            effectiveDate: "",
            createdBy: "",
            createDate: "",
            modifiedBy: "",
            modifiedDate: "",
          }),
        }}
        editable={{
          type: "multiple",
          editableKeys: dataSource.map((item) => item.key),
          onSave: handleSave,
          onDelete: handleDelete,
        }}
      />
    </Form>
  );
};

export default TariffChargesMaintenance;
