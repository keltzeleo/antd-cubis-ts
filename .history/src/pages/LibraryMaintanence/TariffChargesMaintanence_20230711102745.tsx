import { ProTable } from "@ant-design/pro-table";
import { useState } from "react";

interface Theme {
  [key: string]: string;
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
        block: "",
        rate: "",
        effectiveDate: "",
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

const columns = [
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
    dataIndex: "action",
    valueType: "option",
    render: (_, record) => (
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

  const expandedRowRender = (record: any) => {
    const handleCollapse = () => {
      handleExpand(false, record);
    };

    const handleAddRateCharge = () => {
      // Logic for adding a new rate charge
    };

    return (
      <>
        <ProTable
          columns={[
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
              renderFormItem: (_, { record }) => {
                if (record.key === "add") {
                  return <></>; // Render your block input field here
                }
                return record.block;
              },
            },
            {
              title: "Rate",
              dataIndex: "rate",
              key: "rate",
              valueType: "text",
              renderFormItem: (_, { record }) => {
                if (record.key === "add") {
                  return <></>; // Render your rate input field here
                }
                return record.rate;
              },
            },
            {
              title: "Effective Date",
              dataIndex: "effectiveDate",
              key: "effectiveDate",
              valueType: "text",
              renderFormItem: (_, { record }) => {
                if (record.key === "add") {
                  return <></>; // Render your effective date picker field here
                }
                return record.effectiveDate;
              },
            },
            {
              title: "Action",
              key: "action",
              dataIndex: "action",
              valueType: "option",
              render: (_, { record }) => {
                if (record.key === "add") {
                  return <a onClick={handleAddRateCharge}>Add</a>;
                }
                return (
                  <>
                    <a>Edit</a> / <a>Delete</a>
                  </>
                );
              },
            },
          ]}
          dataSource={record.blocks}
          rowKey="key"
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
