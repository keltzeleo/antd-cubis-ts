import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
} from "antd";
import { ColumnType } from "antd/lib/table";
import moment, { Moment } from "moment";
import React, { ReactNode, useRef, useState } from "react";

interface Theme {
  [key: string]: string;
}

interface NestedDataType {
  key: string;
  status: string;
  block: [number, number] | null;
  rate: number | null;
  effectiveDate: string | number | Date;
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
  effectiveDate: string | number | Date;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData?: NestedDataType[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface EditableTableProps {
  dataSource: NestedDataType[];
  handleEditRate: (value: number | undefined, record: NestedDataType) => void;
  handleEditBlock: (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => void;
  handleEditEffectiveDate: (
    value: Moment | null,
    record: NestedDataType
  ) => void;
}

const EditableRow: React.FC<any> = ({ form, index, ...props }) => {
  return (
    <Form component={false} form={form} initialValues={props}>
      <tr {...props} />
    </Form>
  );
};

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableTable: React.FC<EditableTableProps> = ({
  dataSource,
  handleEditRate,
  handleEditBlock,
  handleEditEffectiveDate,
}) => {
  const handleSave = (row: NestedDataType) => {
    // Perform save operation
  };

  const renderText = (text: ReactNode) => <span>{text}</span>;

  const columns: ColumnType<NestedDataType>[] = [
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
      render: (text: [number, number]) => (
        <span>{Array.isArray(text) ? `${text[0]}-${text[1]}m³` : text}</span>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: number, record: NestedDataType) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handleEditRate(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date, record: NestedDataType) => (
        <DatePicker
          defaultValue={moment(text)}
          onChange={(value) => handleEditEffectiveDate(value, record)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: NestedDataType) => {
        const editable = true; // Set based on your conditions
        return editable ? (
          <Space>
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ) : null;
      },
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Table<NestedDataType>
      components={components}
      rowClassName={() => "editable-row"}
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(true);
  const [editData, setEditData] = useState<
    Partial<Record<string, Partial<TariffChargesDataType>>>
  >({});

  const handleToggleColumns = (checked: boolean) => {
    setShowAdditionalColumns(checked);
  };

  const handleEditMonthlyMinimumCharges = (
    value: number | undefined,
    record: TariffChargesDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        monthlyMinimumCharges: value,
      },
    }));
  };

  const handleEditRate = (
    value: number | undefined,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                rate: value,
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const handleEditBlock = (
    value: [number, number] | undefined,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                block: value,
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const handleEditEffectiveDate = (
    value: Moment | null,
    record: NestedDataType
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [record.key]: {
        ...prevState[record.key],
        nestedData: prevState[record.key]?.nestedData?.map(
          (item: NestedDataType) => {
            if (item.key === record.key) {
              return {
                ...item,
                effectiveDate: value?.toISOString(),
              };
            }
            return item;
          }
        ),
      },
    }));
  };

  const columns: ColumnType<TariffChargesDataType>[] = [
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
      render: (text: number, record: TariffChargesDataType) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handleEditMonthlyMinimumCharges(value, record)}
        />
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (text: string | number | Date) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
    },
    ...(showAdditionalColumns
      ? [
          {
            title: "Nested Data",
            dataIndex: "nestedData",
            key: "nestedData",
            render: (
              nestedData: NestedDataType[],
              record: TariffChargesDataType
            ) => {
              return (
                <EditableTable
                  dataSource={nestedData}
                  handleEditRate={handleEditRate}
                  handleEditBlock={handleEditBlock}
                  handleEditEffectiveDate={handleEditEffectiveDate}
                />
              );
            },
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: TariffChargesDataType) => {
        const editable = true; // Set based on your conditions
        return editable ? (
          <Space>
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ) : null;
      },
    },
  ];

  const tariffChargesData: TariffChargesDataType[] = []; // Add your data here

  return (
    <ConfigProvider theme={theme}>
      <Table<TariffChargesDataType>
        columns={columns}
        dataSource={tariffChargesData}
        pagination={false}
        rowKey="key"
      />
    </ConfigProvider>
  );
};

export default TariffChargesMaintenance;
