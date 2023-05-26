import { Avatar, Button, ConfigProvider, Drawer, Table, Tag } from "antd";
import React, { useState } from "react";
import light from "../../src/tokens/light.json";

interface Appointment {
  key: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentLocation: string;
  status: string;
}

interface Plumber {
  key: string;
  name: string;
  assignedAppointments: number;
  unassignedAppointments: number;
  appointments: Appointment[];
}

const AppointmentUpdates: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<Plumber | null>(null);

  const data: Plumber[] = [
    {
      key: "1",
      name: "John Doe",
      assignedAppointments: 5,
      unassignedAppointments: 2,
      appointments: [
        {
          key: "1",
          customerName: "Customer 1",
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "pending",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "2",
      name: "Kel Huang",
      assignedAppointments: 2,
      unassignedAppointments: 4,
      appointments: [
        {
          key: "1",
          customerName: "Customer 2",
          appointmentDate: "2023-05-25",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 2",
          status: "on going",
        },
        // Add more appointments as needed
      ],
    },
    // Add more plumbers with their appointments
  ];

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      { title: "Customer Name", dataIndex: "customerName" },
      // Add more columns as needed
    ];

    return (
      <Table
        dataSource={record.appointments}
        columns={nestedColumns}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "name",
      render: (name: string, record: Plumber) => (
        <div>
          <Button type="link" onClick={() => openDrawer(record)}>
            <Avatar size={24} style={{ marginRight: 8 }} />
            {name}
          </Button>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "appointments",
      render: (appointments: Appointment[], record: Plumber) => (
        <div>
          {/* No header */}
          <Table
            dataSource={appointments}
            columns={appointmentColumns}
            pagination={false}
            expandable={{ expandedRowRender }}
            size="small"
            showHeader={false}
          />
        </div>
      ),
    },
  ];

  const appointmentColumns = [
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
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        let color = "";
        switch (status) {
          case "pending":
            color = "blue";
            break;
          case "cancelled":
            color = "red";
            break;
          case "on going":
            color = "green";
            break;
          case "alert":
            color = "orange";
            break;
          default:
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const openDrawer = (data: Plumber) => {
    setDrawerData(data);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setDrawerData(null);
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <div>
        <Table dataSource={data} columns={columns} />

        <Drawer
          title={drawerData?.name}
          placement="right"
          closable={false}
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <p>Plumber Info: {drawerData?.name}</p>
          {/* Add/Edit buttons and other content */}
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentUpdates;
