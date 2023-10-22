import React, { useState, useEffect } from "react";
import { EditableProTable, ProColumns } from "@ant-design/pro-table";
import { Button, message, Popconfirm } from "antd";

// Mock data
const mockData = [
  {
    id: "1",
    eventGroup: "Event Group 1",
    eventItem: "Event Item 1",
    descriptionOnBill: "Description 1",
    itemQuantity: 5,
    itemChargeRate: 10.0,
    itemAmount: 50.0,
    govServiceChargePercent: 5,
    govServiceChargeAmount: 2.5,
  },
  {
    id: "2",
    eventGroup: "Event Group 1", // Same Event Group
    eventItem: "Event Item 2",
    descriptionOnBill: "Description 2",
    itemQuantity: 3,
    itemChargeRate: 15.0,
    itemAmount: 45.0,
    govServiceChargePercent: 4,
    govServiceChargeAmount: 1.8,
  },
  {
    id: "3",
    eventGroup: "Event Group 2",
    eventItem: "Event Item 3",
    descriptionOnBill: "Description 3",
    itemQuantity: 2,
    itemChargeRate: 20.0,
    itemAmount: 40.0,
    govServiceChargePercent: 3,
    govServiceChargeAmount: 1.2,
  },
];

const BillStation = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<any[]>(mockData);

  const columns: ProColumns<any>[] = [
    {
      title: "Event Group",
      dataIndex: "eventGroup",
      width: "20%",
      editable: true,
    },
    {
      title: "Event Item",
      dataIndex: "eventItem",
      width: "20%",
      editable: true,
    },
    {
      title: "Description Printed on Bill",
      dataIndex: "descriptionOnBill",
      width: "20%",
      editable: true,
    },
    {
      title: "Item Quantity",
      dataIndex: "itemQuantity",
      width: "10%",
      editable: true,
    },
    {
      title: "Item Charge Rate",
      dataIndex: "itemChargeRate",
      width: "10%",
      valueType: "money",
      editable: true,
    },
    {
      title: "Item Amount",
      dataIndex: "itemAmount",
      width: "10%",
      valueType: "money",
      editable: true,
    },
    {
      title: "Government Service Charge %",
      dataIndex: "govServiceChargePercent",
      width: "10%",
      valueType: "percent",
      editable: true,
    },
    {
      title: "Government Service Charge Amount",
      dataIndex: "govServiceChargeAmount",
      width: "10%",
      valueType: "money",
      editable: true,
    },
    {
      title: "Actions",
      valueType: "option",
      width: "10%",
      render: (text, record, _, action) => (
        <span>
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            Edit
          </a>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => {
              handleDelete(record.id);
            }}
            onCancel={() => message.info("Delete canceled")}
            okText="Yes"
            cancelText="No"
          >
            <a key="delete">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleDelete = (id: React.Key) => {
    setDataSource((prevData) => prevData.filter((item) => item.id !== id));
    message.success("Bill Station deleted successfully!");
  };

  const handleSave = async (rowKey: React.Key, data: any, row: any) => {
    // Handle save action here
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call
    console.log(rowKey, data, row);
  };

  const handleCancel = async (rowKey: React.Key, data: any) => {
    // Handle cancel action here
    console.log(rowKey, data);
  };

  useEffect(() => {
    // You can fetch your data here if needed and set it using setDataSource
    // Example: fetchBillStationData().then((data) => setDataSource(data));
  }, []);

  return (
    <div>
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: handleSave,
          onCancel: handleCancel,
          onDelete: handleDelete,
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default BillStation;
