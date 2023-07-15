import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, InputNumber } from 'antd';
import React from 'react';

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
  data: Array<any>; // Adjust the type of `data` as per your actual data structure
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
  data,
}) => {
  const dataSource = [
    {
      tariffCode: 'T1',
      tariffAbbreviation: 'TA1',
      monthlyMinimumCharges: 100,
      effectiveSince: '2022-01-01',
      createdBy: 'John Doe',
      createDate: '2022-01-01',
      modifiedBy: 'Jane Smith',
      modifiedDate: '2022-02-01',
      nestedData: [
        {
          status: 'Active',
          block: 'Block1',
          rate: 50,
          monthlyMinimumCharges: 50,
          createdBy: 'John Doe',
          createDate: '2022-01-01',
          modifiedBy: 'Jane Smith',
          modifiedDate: '2022-02-01',
        },
        // Add more nested data objects as needed
      ],
    },
    // Add more data objects as needed
  ];

  const columns: ProColumns<any>[] = [
    //...

    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns = [
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
      render: (text: any, record: any, index: number, action: any) => {
        const onChange = (value: any) => {
          // Update the value of "block" in the nestedData array
          const newData = [...record.nestedData];
          newData[index].block = value;
          action?.startSave(index);
          action?.cancelEditable(index);
          action?.startEdit(index);
        };

        return (
          <InputNumber
            defaultValue={text}
            onChange={onChange}
            style={{ width: '100%' }}
          />
        );
      },
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (text: any, record: any, index: number, action: any) => {
        const onChange = (value: any) => {
          // Update the value of "rate" in the nestedData array
          const newData = [...record.nestedData];
          newData[index].rate = value;
          action?.startSave(index);
          action?.cancelEditable(index);
          action?.startEdit(index);
        };

        return (
          <InputNumber
            defaultValue={text}
            onChange={onChange}
            style={{ width: '100%' }}
          />
        );
      },
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={dataSource}
      rowKey="tariffCode"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ProTable
            dataSource={record.nestedData}
            columns={nestedColumns}
            pagination={false}
            editable={{
              type: 'multiple',
              editableKeys: record.nestedData.map(
                (item: any, index: number) => index,
              ),
              onSave: async (rowKeys, rows) => {
                // Handle the saved changes here
                console.log(rows);
              },
              onChange: (editableKeys) => {
                // Update the editableKeys state
                // This is required to enable editing after expanding a row
                // when other rows are in edit mode
                // You can manage this state using React hooks or state management libraries
                console.log(editableKeys);
              },
            }}
          />
        ),
        rowExpandable: (record) =>
          record.nestedData && record.nestedData.length > 0,
      }}
    />
  );
};

export default TariffChargesMaintenance;
