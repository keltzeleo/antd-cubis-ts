import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-form";
import { ProColumns } from "@ant-design/pro-table";
import { Button, ConfigProvider, Input, Modal, Space, Table } from "antd";
import moment, { Moment } from "moment";
import React, { ReactNode, useState } from "react";

const { confirm } = Modal;

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

const renderText = (text: ReactNode) => <span>{text}</span>;

const TariffChargesMaintenance: React.FC = () => {
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

  const handleEditRate = (
    value: number | undefined,
    record: NestedDataType
  ) => {
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
      render: (text: string, record: TariffChargesDataType) => (
        <ProFormText
          initialValue={text}
          onChange={(value) =>
            setDataSource((prevDataSource) =>
              prevDataSource.map((item) => {
                if (item.tariffCode === record.tariffCode) {
                  return { ...item, tariffCode: value };
                }
                return item;
              })
            )
          }
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: TariffChargesDataType) => (
        <ProFormText
          initialValue={text}
          onChange={(value) =>
            setDataSource((prevDataSource) =>
              prevDataSource.map((item) => {
                if (item.tariffCode === record.tariffCode) {
                  return { ...item, description: value };
                }
                return item;
              })
            )
          }
        />
      ),
    },
    {
      title: "Monthly Minimum Charges",
      dataIndex: "monthlyMinimumCharges",
      key: "monthlyMinimumCharges",
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record.monthlyMinimumCharges}
          onChange={(value) => handleEditMonthlyMinimumCharges(value, record)}
        />
      ),
      render: renderText,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: renderText,
    },
    {
      title: "Created Date",
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
      title: "Action",
      valueType: "option",
      render: (_, record) => (
        <Space>
          <EditOutlined onClick={() => console.log("Edit", record)} />
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const nestedColumns: ProColumns<NestedDataType>[] = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      renderFormItem: () => <Input />,
      render: renderText,
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 0 }}
          initialValue={record.block ? record.block[0] : undefined}
          onChange={(value) =>
            handleEditBlock([value, record.block![1]], record)
          }
        />
      ),
      render: (text: [number, number]) => (
        <span style={{ color: "black" }}>
          {Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}
        </span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          initialValue={record.rate ?? undefined}
          onChange={(value) => handleEditRate(value, record)}
        />
      ),
      render: renderText,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      renderFormItem: (_, { record }) => (
        <ProFormDatePicker
          fieldProps={{ defaultValue: moment(record.effectiveDate) }}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
      render: renderText,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: renderText,
    },
    {
      title: "Created Date",
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
