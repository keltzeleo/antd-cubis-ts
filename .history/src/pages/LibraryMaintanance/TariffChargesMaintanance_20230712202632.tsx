import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Space,
  message,
} from "antd";
import React, { ReactNode, useState } from "react";
import moment from "moment";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [moment.Moment, moment.Moment] | null;
  rate: string;
  effectiveDate: moment.Moment | null;
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
          block: "0-10m³",
          rate: "RM 0.03/m³",
          effectiveDate: "04/07/2020",

          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "02",
          status: "Applied",

          block: "11-20m³",
          rate: "RM 0.08/m³",
          effectiveDate: "04/07/2023",

          createdBy: "John Doe",
          createDate: "2023-07-01",
          modifiedBy: "John Doe",
          modifiedDate: "2023-07-01",
        },
        {
          key: "03",
          status: "Pending",

          block: "21-100m³",
          rate: "RM 0.13/m³",
          effectiveDate: "04/07/2024",
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

          block: "0-10m³",
          rate: "RM 0.03/m³",
          effectiveDate: "04/07/2020",
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
        title: "Monthly Minimum Charges",
        dataIndex: "monthlyMinimumCharges",
        key: "monthlyMinimumCharges",
        render: (text: number, record: TariffChargesDataType) =>
          editData[record.key] ? (
            <ProFormDigitRange
              fieldProps={{
                defaultValue: text,
                onChange: (value) =>
                  handleEditMonthlyMinimumCharges(value, record),
              }}
            />
          ) : (
            renderText(text)
          ),
      },
      {
        title: "Effective Date",
        dataIndex: "effectiveDate",
        key: "effectiveDate",
        render: (text: string | number | Date, record: TariffChargesDataType) =>
          editData[record.key] ? (
            <ProFormDatePicker
              fieldProps={{
                defaultValue: moment(text),
                onChange: (value) =>
                  handleEditEffectiveDate(value, record as NestedDataType),
              }}
            />
          ) : (
            renderText(text)
          ),
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
      renderFormItem: (_, { record }) => {
        if (record.isEditing) {
          return (
            <DatePicker.RangePicker />
          );
        }
        return null;
      },
      render: renderText,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      renderFormItem: (_, { record }) => {
        if (record.isEditing) {
          return (
            <InputNumber min={0} step={0.01} precision={2} />
          );
        }
        return null;
      },
      render: renderText,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      renderFormItem: (_, { record }) => {
        if (record.isEditing) {
          return (
            <DatePicker />
          );
        }
        return null;
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
