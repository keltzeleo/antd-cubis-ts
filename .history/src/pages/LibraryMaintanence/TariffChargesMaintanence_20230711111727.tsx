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

const TariffChargesMaintenance: React.FC<TariffChargesMaintenanceProps> = ({
  theme,
}) => {
  const [columns, setColumns] = useState<ProColumns<any>[]>([
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
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      hideInTable: true, // Initially hide the column
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      hideInTable: true, // Initially hide the column
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      hideInTable: true, // Initially hide the column
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      hideInTable: true, // Initially hide the column
    },
    {
      title: "Details",
      key: "details",
      fixed: "right",
      width: 100,
      render: (_: any, record: any) => (
        <a onClick={() => handleToggleColumns(record.key)}>
          {isColumnVisible(record.key) ? "Hide" : "Show"}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      valueType: "option",
      render: (_: any, record: any) => (
        <>
          <a>Edit</a> / <a>Delete</a>
        </>
      ),
    },
  ]);

  const handleToggleColumns = (key: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.key === key) {
          return { ...column, hideInTable: !column.hideInTable };
        }
        return column;
      })
    );
  };

  const isColumnVisible = (key: string) => {
    const column = columns.find((col) => col.key === key);
    return column ? !column.hideInTable : false;
  };

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

  // Rest of the code...

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
