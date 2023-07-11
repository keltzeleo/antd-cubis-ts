import { ProColumns, ProTable } from "@ant-design/pro-table";
import { useState } from "react";

interface Theme {
  [key: string]: string;
}

interface Block {
  key: string;
  block: string;
  rate: string;
  effectiveDate: string;
}

interface TariffChargesMaintenanceProps {
  theme: Theme;
}

const data = [
  {
    key: "1",
    no: 1,
    tariffCode: "T001",
    effectiveDate: "2023-07-01",
    monthlyMinimumCharge: "$50.00",
    tariffAbbreviation: "Tariff A",
    createdBy: "John Doe",
    createdDate: "2023-06-30",
    modifiedBy: "Jane Smith",
    modifiedDate: "2023-07-01",
    blocks: [
      {
        key: "add",
        block: "", // Placeholder for block input field
        rate: "", // Placeholder for rate input field
        effectiveDate: "", // Placeholder for effective date input field
      },
      {
        key: "01",
        block: "0-10m³",
        rate: "RM 0.03/m³",
        effectiveDate: "04/07/2020",
      },
      {
        key: "02",
        block: "11-20m³",
        rate: "RM 0.08/m³",
        effectiveDate: "04/07/2020",
      },
      {
        key: "03",
        block: "21-100m³",
        rate: "RM 0.13/m³",
        effectiveDate: "04/07/2020",
      },
    ],
  },
  // Other data entries
];

const columns: ProColumns[] = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Tariff Code",
    dataIndex: "tariffCode",
    key: "tariffCode",
  },
  {
    title: "Effective Date",
    dataIndex: "effectiveDate",
    key: "effectiveDate",
  },
  {
    title: "Monthly Minimum Charge",
    dataIndex: "monthlyMinimumCharge",
    key: "monthlyMinimumCharge",
  },
  {
    title: "Tariff Abbreviation",
    dataIndex: "tariffAbbreviation",
    key: "tariffAbbreviation",
  },
  {
    title: "Action",
    key: "action",
    valueType: "option",
    fixed: "right", // Add the fixed property to make the column fixed
    width: 100, // Set the desired width of the fixed column
    render: (_: any, record: any) => (
      <>
        <a>Edit</a> / <a>Delete</a>
      </>
    ),
  },
];

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: any) => {
    const keys = expanded
      ? [...expandedRowKeys, record.key]
      : expandedRowKeys.filter((key) => key !== record.key);
    setExpandedRowKeys(keys);
  };

  const handleAddRateCharge = () => {
    // Logic for adding a new rate charge
  };

  const renderBlockInput = (
    _: any,
    record: Block,
    __: any,
    dom: React.ReactNode
  ) => {
    if (record.key === "add") {
      return (
        <input
          type="text"
          value={record.block}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    }
    return dom;
  };

  const renderRateInput = (
    _: any,
    record: Block,
    __: any,
    dom: React.ReactNode
  ) => {
    if (record.key === "add") {
      return (
        <input
          type="text"
          value={record.rate}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    }
    return dom;
  };

  const renderEffectiveDateInput = (
    _: any,
    record: Block,
    __: any,
    dom: React.ReactNode
  ) => {
    if (record.key === "add") {
      return (
        <input
          type="text"
          value={record.effectiveDate}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    }
    return dom;
  };

  const renderAction = (_: any, record: Block) => {
    if (record.key === "add") {
      return <a onClick={handleAddRateCharge}>Add</a>;
    }
    return (
      <>
        <a>Edit</a> / <a>Delete</a>
      </>
    );
  };

  const nestedTableColumns: ProColumns[] = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      valueType: "text",
      render: renderBlockInput,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      valueType: "text",
      render: renderRateInput,
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      valueType: "text",
      render: renderEffectiveDateInput,
    },
    {
      title: "Action",
      key: "action",
      valueType: "option",
      fixed: "right", // Add the fixed property to make the column fixed
      width: 100, // Set the desired width of the fixed column
      render: renderAction,
    },
  ];

  const expandedRowRender = (record: any) => {
    const handleCollapse = () => {
      handleExpand(false, record);
    };

    const nestedTableData = record.blocks.map(
      (block: Block, index: number) => ({
        index: index + 1,
        block: block,
        rate: block,
        effectiveDate: block,
        action: block,
      })
    );

    return (
      <>
        <ProTable
          columns={nestedTableColumns}
          dataSource={nestedTableData}
          rowKey="index"
          search={false}
          pagination={false}
          headerTitle={false}
        />
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <a onClick={handleCollapse}>Collapse</a>
        </div>
      </>
    );
  };

  return (
    <ProTable
      columns={columns}
      dataSource={data}
      rowKey="key"
      search={false}
      pagination={false}
      expandable={{
        expandedRowRender,
        onExpand: handleExpand,
        expandRowByClick: true,
        expandedRowKeys,
      }}
    />
  );
};

export default TariffChargesMaintenance;
