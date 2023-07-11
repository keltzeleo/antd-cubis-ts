import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { Button, Card, Space } from "antd";
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
  const [data, setData] = useState<Tariff[]>(data);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: Tariff) => {
    const updatedRows = expanded
      ? [...expandedRows, record.tariffCode]
      : expandedRows.filter((row) => row !== record.tariffCode);
    setExpandedRows(updatedRows);
  };

  const handleAddBlock = (record: Tariff) => {
    const newBlockKey = String(record.blocks.length + 1);
    const newBlock: Block = {
      key: newBlockKey,
      blockUnit: "",
      blockRate: "",
      effectiveDate: "",
    };
    const updatedBlocks = [...record.blocks, newBlock];
    const updatedData = data.map((tariff) =>
      tariff.tariffCode === record.tariffCode
        ? { ...tariff, blocks: updatedBlocks }
        : tariff
    );
    setData(updatedData);
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
              <Space style={{ width: "100%" }}>
                {record.blocks.map((block) => (
                  <Card
                    key={block.key}
                    style={{ marginBottom: "10px", width: "33%" }}
                  >
                    <p>Unit: {block.blockUnit}</p>
                    <p>Rate: {block.blockRate}</p>
                    <p>Effective Date: {block.effectiveDate}</p>
                  </Card>
                ))}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddBlock(record)}
                >
                  Add Block
                </Button>
              </Space>
            );
          },
          expandedRowKeys: expandedRows,
          onExpand: handleExpand,
        }}
      />
      <Button type="primary" style={{ marginTop: "10px" }}>
        Add Tariff Code
      </Button>
    </PageContainer>
  );
};

export default TariffChargesMaintenanceCard;
