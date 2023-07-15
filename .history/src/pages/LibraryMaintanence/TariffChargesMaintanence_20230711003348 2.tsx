import { DownOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Dropdown, Menu } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

interface Theme {
  [key: string]: string;
}

interface DataType {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
  theme: Theme;
}

const expandedRowRender = () => {
  const columns: ProColumns<DataType>[] = [
    { title: 'Date', dataIndex: 'date', valueType: 'dateTime' },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'badge',
      render: (_, record) => ({
        status: 'success',
        text: 'Finished',
      }),
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', valueType: 'text' },
    {
      title: 'Action',
      valueType: 'option',
      render: () => [
        <a key="pause">Pause</a>,
        <a key="stop">Stop</a>,
        <Dropdown key="more" overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            More <DownOutlined />
          </a>
        </Dropdown>,
      ],
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 56,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      platform: 'iOS',
      version: '10.3.4.5654',
      theme: {},
    });
  }

  return (
    <ProTable<DataType>
      columns={columns}
      dataSource={data}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
    />
  );
};

const columns: ProColumns<DataType>[] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Platform', dataIndex: 'platform' },
  { title: 'Version', dataIndex: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', valueType: 'dateTime' },
  { title: 'Action', valueType: 'option', render: () => [<a>Publish</a>] },
];

const data: DataType[] = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
    theme: {},
  });
}

function TariffChargesMaintenance() {
  return (
    <ProTable<DataType>
      headerTitle="Tariff Charges Maintenance"
      rowKey="key"
      columns={columns}
      request={() => Promise.resolve({ data })}
      expandable={{ expandedRowRender }}
    />
  );
}

export default TariffChargesMaintenance;
