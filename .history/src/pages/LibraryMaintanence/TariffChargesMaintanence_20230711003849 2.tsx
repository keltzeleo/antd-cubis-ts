import { DownOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Badge, Dropdown, Menu } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

interface DataType {
  key: number;
  date: string;
  name: string;
  upgradeNum: string;
  platform: string; // Added platform property
}

const expandedRowRender = () => {
  const columns: ProColumns<DataType>[] = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Status',
      render: () => (
        <span>
          <Badge status="success" />
          Finished
        </span>
      ),
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum' },
    {
      title: 'Action',
      render: () => (
        <span className="table-operation">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown overlay={menu}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
      platform: 'iOS', // Added platform value
    });
  }

  return (
    <ProTable<DataType>
      columns={columns}
      dataSource={data}
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
  { title: 'Date', dataIndex: 'createdAt' },
  { title: 'Action', render: () => <a>Publish</a> },
];

const data: DataType[] = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: '500',
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}

function TariffChargesMaintenance() {
  return (
    <ProTable<DataType>
      scroll={{ x: 1300 }}
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
      rowKey="key"
    />
  );
}

export default TariffChargesMaintenance;
