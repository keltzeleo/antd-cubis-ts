import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Card, Col, Row, Space } from "antd";
import { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface Block {
  key: string;
  blockUnit: string;
  blockRate: string;
  effectiveDate: string;
}

interface Tariff {
  tariffCode: string;
  tariffAbbreviation: string;
  monthlyMinimumCharge: string;
  effectiveSince: string;
  blocks: Block[];
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
];

const TariffChargesMaintenanceCard: React.FC<
  TariffChargesMaintenanceCardProps
> = ({ theme }) => {
  const [blocks, setBlocks] = useState<Block[]>(data[0].blocks);

  const addBlock = () => {
    const newBlock: Block = {
      key: String(blocks.length + 1),
      blockUnit: "",
      blockRate: "",
      effectiveDate: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockChange = (
    index: number,
    field: keyof Block,
    value: string
  ) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index][field] = value;
    setBlocks(updatedBlocks);
  };

  return (
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
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Space direction="vertical">
                <Card>
                  <Space direction="horizontal">
                    {blocks.map((block, index) => (
                      <div key={block.key}>
                        <Row gutter={16}>
                          <Col span={6}>
                            <p>Unit:</p>
                            <input
                              value={block.blockUnit}
                              onChange={(e) =>
                                handleBlockChange(
                                  index,
                                  "blockUnit",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col span={6}>
                            <p>Rate:</p>
                            <input
                              value={block.blockRate}
                              onChange={(e) =>
                                handleBlockChange(
                                  index,
                                  "blockRate",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col span={6}>
                            <p>Effective Date:</p>
                            <input
                              value={block.effectiveDate}
                              onChange={(e) =>
                                handleBlockChange(
                                  index,
                                  "effectiveDate",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Space>
                </Card>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={addBlock}
                >
                  Add Block
                </Button>
              </Space>
            );
          },
        }}
      />
      <Button type="primary" style={{ marginTop: "10px" }}>
        Add Tariff Code
      </Button>
    </PageContainer>
  );
};

export default TariffChargesMaintenanceCard;
