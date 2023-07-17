import { Button, Form, Table } from "antd";
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
  block: { [key: string]: string | number }[];
  rate: { [key: string]: string | number }[];
  effectiveDate: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<TariffCharge[]>([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: TariffCharge) => record.key === editingKey;

  const edit = (record: Partial<TariffCharge> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key.toString());
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TariffCharge;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey("");
        // Refresh the data and display the latest values
        // You can replace the fetchData function with your actual data fetching logic
        await fetchData();
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
    const newData = data.filter((item) => key !== item.key);
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
      const nestedData = item[dataIndex] as (string | number)[];
      nestedData.push("");
      setData(newData);
    }
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
            <Button type="primary" onClick={() => save(record.key)}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button
              type="primary"
              onClick={() => edit(record)}
              disabled={editingKey !== ""}
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteRow(record.key)}
              disabled={editingKey !== ""}
            >
              Delete
            </Button>
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
      onCell: (record: TariffCharge) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        handleAddNestedData,
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

  // Replace this fetchData function with your actual data fetching logic
  const fetchData = async () => {
    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Replace the following line with your actual data retrieval logic
    const newData: TariffCharge[] = [
      // Your updated data here
    ];
    setData(newData);
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
