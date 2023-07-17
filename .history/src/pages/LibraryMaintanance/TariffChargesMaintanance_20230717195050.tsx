import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Table } from "antd";
import React, { useState } from "react";

interface TariffCharge {
  key: string;
  no: number;
  tariffCode: string;
  minimumMonthlyCharges: number;
  block: { [key: string]: number };
  rate: { [key: string]: number };
  effectiveDate: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: TariffCharge;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex === "minimumMonthlyCharges" ? (
      <InputNumber min={0} />
    ) : dataIndex === "block" || dataIndex === "rate" ? (
      <Input />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TariffChargesMaintenance: React.FC = () => {
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

  const columns = [
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
      onCell: (record: TariffCharge, index: number) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        index,
      }),
    };
  });

  const handleAddRow = () => {
    const newKey = String(data.length + 1);
    const newRow: TariffCharge = {
      key: newKey,
      no: data.length + 1,
      tariffCode: "",
      minimumMonthlyCharges: 0,
      block: {},
      rate: {},
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
