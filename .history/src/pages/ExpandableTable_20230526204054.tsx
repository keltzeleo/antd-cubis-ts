import { Table } from "antd";
import React, { useState } from "react";

interface Appointment {
  customerName: string;
  status: string;
  date: Date;
}

const ExpandableTable = () => {
  const [expanded, setExpanded] = useState<React.Key[]>([]);

  const columns: Table.ColumnType<Appointment>[] = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string, record: Appointment) => {
        const statusCategories: string[] = ["Assigned", "Cancelled", "Pending"];

        return (
          <span>{statusCategories.find((category) => category === text)}</span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  const data: Appointment[] = [
    {
      customerName: "John Doe",
      status: "Assigned",
      date: new Date(),
    },
    {
      customerName: "Jane Doe",
      status: "Cancelled",
      date: new Date(),
    },
    {
      customerName: "Peter Smith",
      status: "Pending",
      date: new Date(),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowKeys: expanded,
          onExpand: (expandedKeys) => setExpanded(expandedKeys as React.Key[]),
        }}
      />
    </div>
  );
};

export default ExpandableTable;
