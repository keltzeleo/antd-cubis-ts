import { Table } from "antd";
import { useState } from "react";

const ExpandableTable = () => {
  const [expanded, setExpanded] = useState([false, false, false]);

  const columns: Table.Column<Appointment>[] = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record: Appointment) => {
        const statusCategories: Array<string> = [
          "Assigned",
          "Cancelled",
          "Pending",
        ];

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
        data={data}
        expandable={{
          expandedRowKeys: expanded,
          onExpand: (expandedKeys) => setExpanded(expandedKeys),
        }}
      />
    </div>
  );
};

export default ExpandableTable;
