import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import React, { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

interface TariffCharge {
  key: string;
  no: number;
  tariffCode: string;
  minimumMonthlyCharges: number;
  block: { [key: string]: number | string }[];
  rate: { [key: string]: number | string }[];
  effectiveDate: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  [key: string]: any; // Add index signature
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: TariffCharge;
  index: number;
  children: React.ReactNode;
  handleAddNestedData: (
    record: TariffCharge,
    dataIndex: keyof TariffCharge
  ) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  handleAddNestedData,
  ...restProps
}) => {
  const [nestedData, setNestedData] = useState<Array<string | number>>(
    record[dataIndex] as Array<string | number>
  );

  const handleAddRow = () => {
    setNestedData([...nestedData, ""]);
  };

  const handleNestedDataChange = (
    nestedIndex: number,
    value: number | string
  ) => {
    const updatedData = [...nestedData];
    updatedData[nestedIndex] = value;
    setNestedData(updatedData);
  };

  const handleRemoveRow = (nestedIndex: number) => {
    const updatedData = [...nestedData];
    updatedData.splice(nestedIndex, 1);
    setNestedData(updatedData);
  };

  const inputNode = (
    <Input
      value={
        nestedData[index] !== undefined ? nestedData[index].toString() : ""
      }
      onChange={(e) => handleNestedDataChange(index, e.target.value)}
    />
  );

  const nestedDataNodes = nestedData.map((data, nestedIndex) => (
    <div key={nestedIndex} style={{ marginBottom: 8 }}>
      <Input
        value={data.toString()}
        onChange={(e) => handleNestedDataChange(nestedIndex, e.target.value)}
        style={{ width: "60%", marginRight: 8 }}
      />
      {editing && (
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          size="small"
          onClick={() => handleRemoveRow(nestedIndex)}
        />
      )}
    </div>
  ));

  return (
    <td {...restProps}>
      {editing ? (
        <>
          {nestedDataNodes}
          <div>
            <Button
              type="dashed"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => handleAddNestedData(record, dataIndex)}
            >
              Add {title}
            </Button>
          </div>
        </>
      ) : (
        children
      )}
    </td>
  );
};

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<TariffCharge[]>([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: TariffCharge) => record.key === editingKey;

  const edit = (record: Partial<TariffCharge> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TariffCharge;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteRow = (key: React.Key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAddNestedData = (
    record: TariffCharge,
    dataIndex: keyof TariffCharge
  ) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);

    if (index > -1) {
      const item = newData[index];
      (item[dataIndex] as Array<string | number>).push("");
      setData(newData);
    }
  };

  const columns: Array<any> = [
    {
      title: "No",
      dataIndex: "no",
      editable: false,
    },
    {
      title: "Tariff Code",
      dataIndex: "tariffCode",
      editable: false,
    },
    {
      title: "Minimum Monthly Charges",
      dataIndex: "minimumMonthlyCharges",
      editable: true,
    },
    {
      title: "Block",
      dataIndex: "block",
      editable: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      editable: true,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      editable: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      editable: false,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      editable: false,
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      editable: false,
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      editable: false,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: TariffCharge) => {
        const editing = isEditing(record);

        return editing ? (
          <span>
            <Button
              type="primary"
              onClick={() => save(record.key)}
              icon={<SaveOutlined />}
            />
            <Button onClick={cancel} icon={<CloseOutlined />} />
          </span>
        ) : (
          <span>
            <Button
              type="primary"
              onClick={() => edit(record)}
              disabled={editingKey !== ""}
              icon={<EditOutlined />}
            />
            <Button
              onClick={() => deleteRow(record.key)}
              disabled={editingKey !== ""}
              icon={<DeleteOutlined />}
            />
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: TariffCharge, rowIndex: number) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        index: rowIndex,
        handleAddNestedData,
      }),
            
  const handleAddRow = () => {
    const newKey = String(data.length + 1);
    const newRow: TariffCharge = {
      key: newKey,
      no: data.length + 1,
      tariffCode: "",
      minimumMonthlyCharges: 0,
      block: [],
      rate: [],
      effectiveDate: "",
      createdBy: "",
      createdDate: "",
      modifiedBy: "",
      modifiedDate: "",
    };

    const newData = [...data, newRow];
    setData(newData);
    setEditingKey(newKey);
  };

  return (
    <>
      <Button onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default TariffChargesMaintenance;
