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
    // ...
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
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => <Button type="primary">Add</Button>,
    },
    // Collapse columns
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      hideInTable: true,
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      hideInTable: true,
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      hideInTable: true,
    },
    {
      title: 'Modified Date',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      hideInTable: true,
    },
  ];

  const nestedColumns = [
    // ...
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
