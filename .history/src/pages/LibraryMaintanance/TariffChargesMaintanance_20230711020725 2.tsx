import { ProColumns, ProTable } from '@ant-design/pro-table';
import { Button } from 'antd';
import React from 'react';

interface Theme {
  [key: string]: string;
}

interface NestedData {
  status: string;
  block: string;
  rate: number;
  monthlyMinimumCharges: number;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

interface TariffData {
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharges: number;
  effectiveSince: string;
  createdBy: string;
  createDate: string;
  modifiedBy: string;
  modifiedDate: string;
  nestedData: NestedData[];
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
  data: TariffData[]; // Update the type of `data` to TariffData[]
}

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
  data,
}) => {
  const dataSource: TariffData[] = data;

  const columns: ProColumns<TariffData>[] = [
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

  const nestedColumns: ProColumns<NestedData>[] = [
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
