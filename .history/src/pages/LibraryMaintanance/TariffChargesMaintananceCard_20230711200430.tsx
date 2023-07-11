import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Card } from "antd";

// Mock data
const data = [
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
      // ... other blocks
    ],
  },
  // ... other tariff codes
];

const columns: ProColumns<(typeof data)[0]>[] = [
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

const TariffChargesMaintenanceCard: React.FC = () => (
  <PageContainer>
    <ProTable<(typeof data)[0]>
      dataSource={data}
      columns={columns}
      rowKey="tariffCode"
      search={false}
      pagination={false}
      dateFormatter="string"
      headerTitle="Tariff Charges Maintenance"
    />
    <Button type="primary" style={{ marginTop: "10px" }}>
      Add Tariff Code
    </Button>
  </PageContainer>
);

export default TariffChargesMaintenanceCard;
