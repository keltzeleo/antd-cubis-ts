import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ProForm, { ProFormDatePicker, ProFormDigit } from "@ant-design/pro-form";
import { ProColumns } from "@ant-design/pro-table";
import { Button, ConfigProvider, Modal, Space, Table } from "antd";
import moment, { Moment } from "moment";
import React, { ReactNode, useState } from "react";

const { confirm } = Modal;

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface TariffChargesDataType {
  tariffCode: string;
  description: string;
  monthlyMinimumCharges: number | undefined;
  nestedData?: NestedDataType[];
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number | undefined;
  effectiveDate: Moment | null;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = (
  theme
) => {
  const [dataSource, setDataSource] = useState<TariffChargesDataType[]>([
    {
      tariffCode: "001",
      description: "Tariff 001",
      monthlyMinimumCharges: 100,
      nestedData: [
        {
          key: "1",
          status: "Active",
          block: [0, 10],
          rate: 5.0,
          effectiveDate: moment("2023-07-01"),
          createdBy: "John",
          createDate: "2023-07-01",
          modifiedBy: "John",
          modifiedDate: "2023-07-01",
        },
      ],
      createdBy: "John",
      createDate: "2023-07-01",
      modifiedBy: "John",
      modifiedDate: "2023-07-01",
    },
  ]);
};

const renderText = (text: ReactNode) => (
  <span style={theme["colorText"]}>{text}</span>
);

const handleEditRate = (value: number | undefined, record: NestedDataType) => {
  setDataSource((prevDataSource) =>
    prevDataSource.map((item) => {
      if (item.nestedData) {
        const nestedData = item.nestedData.map((nestedItem) => {
          if (nestedItem.key === record.key) {
            return { ...nestedItem, rate: value };
          }
          return nestedItem;
        });
        return { ...item, nestedData };
      }
      return item;
    })
  );
};

const handleEditBlock = (
  value: [number, number] | null,
  record: NestedDataType
) => {
  setDataSource((prevDataSource) =>
    prevDataSource.map((item) => {
      if (item.nestedData) {
        const nestedData = item.nestedData.map((nestedItem) => {
          if (nestedItem.key === record.key) {
            return { ...nestedItem, block: value };
          }
          return nestedItem;
        });
        return { ...item, nestedData };
      }
      return item;
    })
  );
};

const handleEditEffectiveDate = (
  value: Moment | null,
  record: NestedDataType
) => {
  setDataSource((prevDataSource) =>
    prevDataSource.map((item) => {
      if (item.nestedData) {
        const nestedData = item.nestedData.map((nestedItem) => {
          if (nestedItem.key === record.key) {
            return { ...nestedItem, effectiveDate: value };
          }
          return nestedItem;
        });
        return { ...item, nestedData };
      }
      return item;
    })
  );
};

const handleMonthlyMinimumChargesChange = (value: number | undefined) => {
  // Handle the onChange logic here
  // For example, call handleEditMonthlyMinimumCharges with the updated value
  handleEditMonthlyMinimumCharges(value, record);

  const handleEditMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffChargesDataType
  ) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.tariffCode === record.tariffCode) {
          return { ...item, monthlyMinimumCharges: value };
        }
        return item;
      })
    );
  };

  const handleAdd = () => {
    const newTariff: TariffChargesDataType = {
      tariffCode: "",
      description: "",
      monthlyMinimumCharges: undefined,
      createdBy: "",
      createDate: "",
      modifiedBy: "",
      modifiedDate: "",
    };

    setDataSource((prevDataSource) => [...prevDataSource, newTariff]);
  };

  const handleDelete = (record: TariffChargesDataType) => {
    confirm({
      title: "Are you sure you want to delete this tariff?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.tariffCode !== record.tariffCode)
        );
      },
    });
  };

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
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record?.monthlyMinimumCharges} // Add the conditional check here
          value={record?.monthlyMinimumCharges} // Pass the value explicitly
          onChange={handleMonthlyMinimumChargesChange} // Use the separate onChange handler
        />
      ),
      render: renderText,
    },

    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
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
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_: ReactNode, entity: TariffChargesDataType) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Space>
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
      render: (text: ReactNode) => (
        <span style={{ color: theme["colorText"] }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (dom: ReactNode, entity: NestedDataType, index: number) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={entity.rate ?? undefined}
          onChange={(value) => handleEditRate(value, entity)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "date",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
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
  ];

  return (
    <ConfigProvider renderEmpty={() => <div>No Data</div>}>
      <ProForm<TariffChargesDataType>
        columns={columns}
        rowKey="tariffCode"
        dataSource={dataSource}
        editable={{
          type: "multiple",
        }}
        onSubmit={console.log}
      >
        <Button type="primary" onClick={handleAdd}>
          Add Tariff
        </Button>
        <Table<NestedDataType>
          columns={nestedColumns}
          dataSource={dataSource[0]?.nestedData ?? []}
          rowKey="key"
          pagination={false}
        />
      </ProForm>
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
