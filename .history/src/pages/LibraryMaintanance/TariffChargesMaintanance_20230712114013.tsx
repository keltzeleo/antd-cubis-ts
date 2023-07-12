import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Checkbox, Form, Space, message } from "antd";
import React, { ReactNode, useState } from "react";

import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormDigitRange,
} from "@ant-design/pro-form";
import { CheckboxProps } from "antd";
import moment, { Moment } from "moment";

tsx;

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number;
  effectiveDate: Moment | null;
  isEditing?: boolean;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffChargesDataType {
  key: string;
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveDate: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface ToggleColumnsCheckboxProps extends CheckboxProps {
  onChange: (checked: boolean) => void;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);

  const [form] = Form.useForm();

  const dataSource: TariffChargesDataType[] = [
    {
      key: "01",
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
          key: "01",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: moment("04/07/2020", "DD/MM/YYYY"),
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "02",
          status: "Applied",
          block: [11, 20],
          rate: 0.08,
          effectiveDate: moment("04/07/2023", "DD/MM/YYYY"),
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "03",
          status: "Pending",
          block: [21, 100],
          rate: 0.13,
          effectiveDate: moment("04/07/2024", "DD/MM/YYYY"),
          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
      ],
    },
    {
      key: "02",
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
          key: "01",
          status: "Applied",
          block: [0, 10],
          rate: 0.03,
          effectiveDate: moment("04/07/2020", "DD/MM/YYYY"),
          createdBy: "Jane Smith",
          createDate: "2023-07-01",
          modifiedBy: "Jane Smith",
          modifiedDate: "2023-07-01",
        },
      ],
    },
  ];

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleAdd = (record: TariffChargesDataType) => {
    console.log("Add record", record);
    // Handle add logic here
  };

  const handleEdit = (record: NestedDataType) => {
    form.setFieldsValue({ ...record }); // set initial form values
    // create a new copy of the dataSource where only the editing row's isEditing property is true
    setDataSource((dataSource) =>
      dataSource.map((item) =>
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
    // rest of the columns
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
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <Form.Item name="block">
              <ProFormDigitRange
                fieldProps={{
                  placeholder: ["Min", "Max"],
                }}
              />
            </Form.Item>
          );
        }
        return renderText(text);
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
              name="rate"
              rules={[
                {
                  pattern: /^\d+(\.\d{1,2})?$/,
                  message: "Please input valid rate.",
                },
              ]}
            >
              <ProFormDigit
                fieldProps={{
                  min: 0,
                  step: 0.01,
                  precision: 2,
                  formatter: (value) => `RM ${value}`,
                  parser: (value) => value.replace(/RM\s?|(,*)/g, ""),
                }}
              />
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
            <Form.Item name="effectiveDate">
              <ProFormDatePicker format="DD/MM/YYYY" />
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
  );
};

export default TariffChargesMaintenance;
