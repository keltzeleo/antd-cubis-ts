import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
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
    {
      title: 'Tariff Code',
      dataIndex: 'tariffCode',
      key: 'tariffCode',
    },
    {
      title: 'Tariff Abbreviation',
      dataIndex: 'tariffAbbreviation',
      key: 'tariffAbbreviation',
    },
    {
      title: 'Monthly Minimum Charges',
      dataIndex: 'monthlyMinimumCharges',
      key: 'monthlyMinimumCharges',
    },
    {
      title: 'Effective Since',
      dataIndex: 'effectiveSince',
      key: 'effectiveSince',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
    },
    {
      title: 'Modified Date',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => <Button type="primary">Add</Button>,
    },
  ];

  const nestedColumns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Monthly Minimum Charges',
      dataIndex: 'monthlyMinimumCharges',
      key: 'nestedMonthlyMinimumCharges',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'nestedCreatedBy',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'nestedCreateDate',
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
      key: 'nestedModifiedBy',
    },
    {
      title: 'Modified Date',
      dataIndex: 'modifiedDate',
      key: 'nestedModifiedDate',
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
          />
        ),
        rowExpandable: (record) =>
          record.nestedData && record.nestedData.length > 0,
      }}
    />
  );
};

export default TariffChargesMaintenance;
