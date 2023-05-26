import { Collapse, List, Table } from "antd";
import { useState } from "react";

interface Appointment {
  key: number;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentLocation: string;
  typeOfService: string;
  status: string;
}

const ExpandableTable = () => {
  const [expanded, setExpanded] = useState([false, false, false]);

  const columns: Table.Column<Appointment>[] = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
    },
    {
      title: "Appointment Location",
      dataIndex: "appointmentLocation",
    },
    {
      title: "Type of Service",
      dataIndex: "typeOfService",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record: Appointment) => {
        const statusCategories: Array<string> = [
          "Assigned",
          "Cancelled",
          "Failed to Visit",
          "Reassigning",
          "Rescheduled",
        ];
        const statusCategory = statusCategories.find(
          (category) => category === record.status
        );
        return statusCategory ? statusCategory : record.status;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data: Appointment[] = [
    {
      key: 1,
      customerName: "John Doe",
      appointmentDate: "2023-05-26",
      appointmentTime: "10:00 AM",
      appointmentLocation: "123 Main Street",
      typeOfService: "Car Repair",
      status: "Pending",
    },
    {
      key: 2,
      customerName: "Jane Doe",
      appointmentDate: "2023-05-27",
      appointmentTime: "11:00 AM",
      appointmentLocation: "456 Elm Street",
      typeOfService: "Oil Change",
      status: "Completed",
    },
    {
      key: 3,
      customerName: "Peter Smith",
      appointmentDate: "2023-05-28",
      appointmentTime: "12:00 PM",
      appointmentLocation: "789 Oak Street",
      typeOfService: "Tire Rotation",
      status: "Pending",
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(record) => record.key}
      expandable={{
        expandedRowKeys: expanded,
        onExpand: (expandedKeys) => setExpanded(expandedKeys),
      }}
    >
      <List key="list1">
        <Collapse key="collapse1" expandIcon={<Icon type="caret-right" />}>
          <Table columns={columns} data={data} />
        </Collapse>
      </List>
      <List key="list2">
        <Collapse key="collapse2" expandIcon={<Icon type="caret-right" />}>
          <Table columns={columns} data={data} />
        </Collapse>
      </List>
      <List key="list3">
        <Collapse key="collapse3" expandIcon={<Icon type="caret-right" />}>
          <Table columns={columns} data={data} />
        </Collapse>
      </List>
    </Table>
  );
};

export default ExpandableTable;
