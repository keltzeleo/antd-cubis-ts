import { ProForm, ProTable } from "@ant-design/pro-table";
import { useState } from "react";

interface Theme {
  [key: string]: string;
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
        key: "01",
        block: "0-10m³",
        rate: "RM 0.03/m³",
        startingEffectiveDate: "04/07/2020",
        createdBy: "John Doe",
        createdDate: "2023-06-30",
        modifiedBy: "Jane Smith",
        modifiedDate: "2023-07-01",
      },
      {
        key: "02",
        block: "11-20m³",
        rate: "RM 0.08/m³",
        startingEffectiveDate: "04/07/2020",
      },
      {
        key: "03",
        block: "21-100m³",
        rate: "RM 0.13/m³",
        startingEffectiveDate: "04/07/2020",
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

const TariffChargesMaintenance = [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    render: (_, subRecord, index) => index + 1,
  },
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    valueType: "text",
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    valueType: "text",
  },
  {
    title: "Starting Effective Date",
    dataIndex: "startingEffectiveDate",
    key: "startingEffectiveDate",
    valueType: "text",
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
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    valueType: "text",
    hideInTable: true,
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
    valueType: "date",
    hideInTable: true,
  },
  {
    title: "Modified By",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    valueType: "text",
    hideInTable: true,
  },
  {
    title: "Modified Date",
    dataIndex: "modifiedDate",
    key: "modifiedDate",
    valueType: "date",
    hideInTable: true,
  },
];

const expandedRowRender = (record) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ProTable
        columns={nestedTableColumns}
        dataSource={record.blocks}
        rowKey="key"
        search={false}
        pagination={false}
        headerTitle={false}
        expandable={{
          expandedRowRender: (_, subRecord) =>
            expanded && (
              <ProForm.Group>
                <ProForm.Item label="Created By" name="createdBy">
                  {subRecord.createdBy}
                </ProForm.Item>
                <ProForm.Item label="Created Date" name="createdDate">
                  {subRecord.createdDate}
                </ProForm.Item>
                <ProForm.Item label="Modified By" name="modifiedBy">
                  {subRecord.modifiedBy}
                </ProForm.Item>
                <ProForm.Item label="Modified Date" name="modifiedDate">
                  {subRecord.modifiedDate}
                </ProForm.Item>
              </ProForm.Group>
            ),
          onExpand: (_, expandedRows) => {
            setExpanded(expandedRows.includes(record.key));
          },
          expandRowByClick: true,
        }}
      />
      {expanded && (
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <a onClick={() => setExpanded(false)}>Collapse</a>
        </div>
      )}
    </>
  );
};

const TableWithExpandableRows = () => {
  return (
    <ProTable
      columns={columns}
      dataSource={data}
      rowKey="key"
      search={false}
      pagination={false}
      expandable={{
        expandedRowRender,
        expandRowByClick: true,
        defaultExpandAllRows: false,
      }}
      expandableRowKeys={data.map((item) => item.key)}
    />
  );
};

export default TariffChargesMaintenance;
