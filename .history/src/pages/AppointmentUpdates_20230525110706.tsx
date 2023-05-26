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
  cancelledAppointments: number;
  rebookingAppointments: number;
  rescheduledAppointments: number;
  failedAppointments: number;

  appointments: Appointment[];
}

const getRandomColor = (): string => {
  const colors = Object.values(light);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as string;
};

const AppointmentUpdates: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<Plumber | null>(null);
  const [addAppointmentDrawerVisible, setAddAppointmentDrawerVisible] =
    useState(false);

  const data: Plumber[] = [
    {
      key: "1",
      name: "John Doe",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar

      assignedAppointments: 0,
      cancelledAppointments: 0,
      rebookingAppointments: 0,
      rescheduledAppointments: 0,
      failedAppointments: 0,

      appointments: [
        {
          key: "1",
          customerName: "Customer 1",
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "rescheduled",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "2",
      name: "Kel Huang",
      avatar: "./icons/avatarMeow.png", // Replace with the actual URL or identifier for the avatar
      assignedAppointments: 0,
      cancelledAppointments: 0,
      failedAppointments: 0,
      rebookingAppointments: 0,
      rescheduledAppointments: 0,

      appointments: [
        {
          key: "1",
          customerName: "Ahmad bin Abdullah",
          appointmentDate: "2023-05-24",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
        },
        {
          key: "2",
          customerName: "Tan Ah Ching",
          appointmentDate: "2023-05-26",
          appointmentTime: "1:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
        },
        {
          key: "3",
          customerName: "Lee Xiao Ming",
          appointmentDate: "2023-05-27",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "cancelled",
        },
        {
          key: "4",
          customerName: "Bhavin a/l Ishir",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "cancelled",
        },
        {
          key: "5",
          customerName: "Amyra a/p Kiaan",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "cancelled",
        },
        // Add more appointments as needed
      ],
    },
    // Add more plumbers with their appointments
  ];

  data.forEach((plumber) => {
    plumber.assignedAppointments = plumber.appointments.length;
    plumber.cancelledAppointments = plumber.appointments.filter(
      (appointment) => appointment.status === "pending"
    ).length;
  });

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
            case "assigned":
              color = "grass";
              break;
            case "cancelled":
              color = "red";
              break;
            case "failed":
              color = "geekblue";
              break;
            case "rebook":
              color = "blue";
              break;
            case "rescheduled":
              color = "lime";
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
      setAddAppointmentDrawerVisible(true);
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
      </div>
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "name",
      render: (name: string, record: Plumber) => {
        const totalAppointmentCount = record.appointments.length;
        const assignedCount = record.appointments.filter(
          (appointment) => appointment.status === "assigned"
        ).length;
        const cancelledCount = record.appointments.filter(
          (appointment) => appointment.status === "cancelled"
        ).length;
        const rebookingCount = record.appointments.filter(
          (appointment) => appointment.status === "rebooking"
        ).length;
        const rescheduledCount = record.appointments.filter(
          (appointment) => appointment.status === "rescheduled"
        ).length;
        const failedCount = record.appointments.filter(
          (appointment) => appointment.status === "failed"
        ).length;

        return (
          <div>
            <Avatar
              size={32}
              src={record.avatar}
              style={{ backgroundColor: getRandomColor() }}
            />
            <Button
              type="link"
              onClick={() => {
                setDrawerData(record);
                setDrawerVisible(true);
              }}
              style={{ marginRight: 8 }}
            >
              <span>
                {name} has total of {totalAppointmentCount} appointment
                {record.appointments.length !== 1 ? "s" : ""}
              </span>
            </Button>
            <span
              style={{
                marginLeft: 4,
                marginTop: 8,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Tag color="green">{assignedCount} assigned</Tag> &nbsp;
              <Tag color="red">{cancelledCount} cancelled</Tag> &nbsp;
              <Tag color="blue">{rebookingCount} re-booking</Tag> &nbsp;
              <Tag color="lime">{rescheduledCount} rescheduled</Tag> &nbsp;
              <Tag color="orange">{failedCount} failed to visit</Tag> &nbsp;
            </span>
          </div>
        );
      },
    },
  ];

  const closeDrawer = () => {
    setDrawerVisible(false);
    setDrawerData(null);
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
          title={`Add Appointment for ${drawerData?.name}`}
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
                style={{
                  backgroundColor: getRandomColor(),
                  marginLeft: -2,
                  marginRight: 16,
                }}
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
