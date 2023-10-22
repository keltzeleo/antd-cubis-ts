import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';

const StationBill = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: '1',
      eventGroup: 'Event Group 1',
      eventItem: 'Event Item 1',
      descriptionOnBill: 'Description 1',
      itemQuantity: 10,
      itemChargeRate: 15.5,
      itemAmount: 155.0,
      governmentServiceChargePercent: 5.0,
      governmentServiceChargeAmount: 7.75,
    },
    {
      key: '2',
      eventGroup: 'Event Group 2',
      eventItem: 'Event Item 2',
      descriptionOnBill: 'Description 2',
      itemQuantity: 8,
      itemChargeRate: 12.0,
      itemAmount: 96.0,
      governmentServiceChargePercent: 5.0,
      governmentServiceChargeAmount: 4.8,
    },
  ]);

  const columns: ProColumns<any>[] = [
    {
      title: 'Event Group',
      dataIndex: 'eventGroup',
      width: '20%',
    },
    {
      title: 'Event Item',
      dataIndex: 'eventItem',
      width: '20%',
    },
    {
      title: 'Description Printed on Bill',
      dataIndex: 'descriptionOnBill',
      width: '20%',
    },
    {
      title: 'Item Quantity',
      dataIndex: 'itemQuantity',
      width: '10%',
    },
    {
      title: 'Item Charge Rate',
      dataIndex: 'itemChargeRate',
      width: '10%',
      valueType: 'money',
    },
    {
      title: 'Item Amount',
      dataIndex: 'itemAmount',
      width: '10%',
      valueType: 'money',
    },
    {
      title: 'Government Service Charge %',
      dataIndex: 'governmentServiceChargePercent',
      width: '10%',
      valueType: 'percent',
    },
    {
      title: 'Government Service Charge Amount',
      dataIndex: 'governmentServiceChargeAmount',
      width: '10%',
      valueType: 'money',
    },
    {
      title: 'Actions',
      valueType: 'option',
      width: '10%',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDelete = (key: React.Key) => {
    setDataSource((prevData) => prevData.filter((item) => item.key !== key));
    message.success('Item deleted successfully!');
  };

  const handleSave = async (key: React.Key, data: any) => {
    // Handle save action here
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call
    console.log(key, data);
  };

  useEffect(() => {
    // You can fetch your data here if needed and set it using setDataSource
    // Example: fetchStationBillData().then((data) => setDataSource(data));
  }, []);

  return (
    <div>
      <EditableProTable
        rowKey="key"
        columns={columns.map((col) => ({
          ...col,
          editable: true, // Make all columns editable
        }))}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={false} // Disable adding new records
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: handleSave,
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default StationBill;
