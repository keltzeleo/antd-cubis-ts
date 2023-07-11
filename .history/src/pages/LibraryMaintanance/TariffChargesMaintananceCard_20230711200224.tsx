import { PageContainer } from "@ant-design/pro-layout";
import { Button, Card, Col, Descriptions, Row } from "antd";

interface Theme {
  [key: string]: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

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

const TariffChargesMaintenanceCard: React.FC = () => (
  <PageContainer>
    {data.map((item) => (
      <Card style={{ marginBottom: "20px" }} key={item.tariffCode}>
        <Descriptions title={`Tariff Code: ${item.tariffCode}`}>
          <Descriptions.Item label="Tariff Abbreviation">
            {item.tariffAbbreviation}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly Minimum Charges">
            {item.monthlyMinimumCharge}
          </Descriptions.Item>
          <Descriptions.Item label="Effective Since">
            {item.effectiveSince}
          </Descriptions.Item>
        </Descriptions>
        <Row gutter={16}>
          {item.blocks.map((block) => (
            <Col span={8} key={block.key}>
              <Card title={`Block ${block.key}`}>
                <p>Unit: {block.blockUnit}</p>
                <p>Rate: {block.blockRate}</p>
                <p>Effective Date: {block.effectiveDate}</p>
              </Card>
            </Col>
          ))}
          <Col span={8}>
            <Button type="primary">Add Block...</Button>
          </Col>
        </Row>
      </Card>
    ))}
  </PageContainer>
);

export default TariffChargesMaintenanceCard;
