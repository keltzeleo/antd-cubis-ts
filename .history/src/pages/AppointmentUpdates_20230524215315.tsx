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
  avatar: string;
  assignedAppointments: number;
  unassignedAppointments: number;
  appointments: Appointment[];
}

const AppointmentUpdates: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<Plumber | null>(null);
  const [addAppointmentVisible, setAddAppointmentVisible] = useState(false);
  const [addAppointmentDrawerVisible, setAddAppointmentDrawerVisible] =
    useState(false);

  const data: Plumber[] = [
    {
      key: "1",
      name: "John Doe",
      avatar: "./icons/avatarMeow01.jpg", // Replace with the actual URL or identifier for the avatar

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
      avatar: "./icons/avatarMeow.jpg", // Replace with the actual URL or identifier for the avatar

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
      { title: "Appointment Date", dataIndex: "appointmentDate" },
      { title: "Appointment Time", dataIndex: "appointmentTime" },
      { title: "Appointment Location", dataIndex: "appointmentLocation" },
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

    const handleAddAppointment = () => {
      setDrawerData(record);
      setDrawerVisible(true);
      setAddAppointmentVisible(true);
    };

    const closeAddAppointmentDrawer = () => {
      setAddAppointmentVisible(false);
    };

    return (
      <div>
        {/* Add Appointment button */}
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAddAppointment}>
            Add Appointment
          </Button>
        </div>
        <Table
          dataSource={record.appointments}
          columns={nestedColumns}
          pagination={false}
        />

        {/* Add Appointment Drawer */}
        <Drawer
          title="Add Appointment"
          placement="right"
          closable={false}
          onClose={closeAddAppointmentDrawer}
          visible={addAppointmentVisible}
        >
          {/* Add appointment form and content */}
          <p>Add Appointment Form</p>
        </Drawer>
      </div>
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "name",
      render: (name: string, record: Plumber) => (
        <div>
          <Avatar size={32} src={record.avatar} />{" "}
          {/* Pass the avatar prop here */}
          <Button
            type="link"
            onClick={() => {
              setDrawerData(record);
              setDrawerVisible(true);
              setAddAppointmentVisible(false);
            }}
            style={{ marginRight: 8 }}
          >
            <span>{name}</span>
          </Button>
          <span style={{ marginLeft: 8 }}>
            {record.appointments.length} assigned appointment
            {record.appointments.length !== 1 ? "s" : ""}
          </span>
        </div>
      ),
    },
  ];

  const closeDrawer = () => {
    setDrawerVisible(false);
    setDrawerData(null);
    setAddAppointmentVisible(false);
  };

  const openAddAppointmentDrawer = (record: Plumber) => {
    setAddAppointmentDrawerVisible(true);
    setDrawerData(record);
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          pagination={false}
        />

        <Drawer
          title="Add Appointment"
          width={610}
          placement="right"
          closable={true}
          onClose={() => setAddAppointmentDrawerVisible(false)}
          visible={addAppointmentDrawerVisible}
        >
          {/* Add appointment form and content */}
          <p>Add Appointment Form</p>
        </Drawer>

        <Drawer
          title={
            <div>
              <Avatar
                size={32}
                src={drawerData?.avatar}
                style={{ marginLeft: -2, marginRight: 16 }}
              />
              {drawerData?.name}
            </div>
          }
          width={680}
          placement="right"
          closable={false}
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <p>Plumber Info: {drawerData?.name}</p>
          <Button
            type="primary"
            onClick={() => drawerData && openAddAppointmentDrawer(drawerData)}
          >
            Add Appointment
          </Button>

          {/* Add/Edit buttons and other content */}
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentUpdates;
