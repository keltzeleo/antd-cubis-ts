import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Card } from "antd";

interface Theme {
  [key: string]: string;
}

interface Tariff {
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharge: string;
  effectiveSince: string;
  blocks: {
    key: string;
    blockUnit: string;
    blockRate: string;
    effectiveDate: string;
  }[];
}

interface TariffChargesMaintenanceCardProps {
  theme: Theme;
}

// Mock data
const data: Tariff[] = [
  {
    tariffCode: "TC1",
    tariffAbbreviation: "TA1",
    monthlyMinimumCharge: "2.00",
    effectiveSince: "2023-07-11",
    blocks: [
      {
        key: "1",
        blockUnit: "10",
        blockRate: "2.0000",
        effectiveDate: "2023-07-11",
      },
      {
        key: "2",
        blockUnit: "20",
        blockRate: "3.0000",
        effectiveDate: "2023-07-11",
      },
      {
        key: "3",
        blockUnit: "30",
        blockRate: "4.0000",
        effectiveDate: "2023-07-11",
      },
    ],
  },
  // ... other tariff codes
];

const columns: ProColumns<Tariff>[] = [
  {
    title: "Tariff Code",
    dataIndex: "tariffCode",
  },
  {
    title: "Tariff Abbreviation",
    dataIndex: "tariffAbbreviation",
  },
  {
    title: "Monthly Minimum Charges",
    dataIndex: "monthlyMinimumCharge",
  },
  {
    title: "Effective Since",
    dataIndex: "effectiveSince",
  },
  {
    title: "Blocks",
    dataIndex: "blocks",
    render: (_, record) => (
      <>
        {record.blocks.map((block) => (
          <Card key={block.key} style={{ marginBottom: "10px" }}>
            <p>Unit: {block.blockUnit}</p>
            <p>Rate: {block.blockRate}</p>
            <p>Effective Date: {block.effectiveDate}</p>
          </Card>
        ))}
      </>
    ),
  },
];

const TariffChargesMaintenanceCard: React.FC<
  TariffChargesMaintenanceCardProps
> = ({ theme }) => (
  <PageContainer>
    <ProTable<Tariff>
      dataSource={data}
      columns={columns}
      rowKey="tariffCode"
      search={false}
      pagination={false}
      dateFormatter="string"
      headerTitle="Tariff Charges Maintenance"
      style={{ background: theme.background, color: theme.color }}
    />
    <Button type="primary" style={{ marginTop: "10px" }}>
      Add Tariff Code
    </Button>
  </PageContainer>
);

export default TariffChargesMaintenanceCard;
