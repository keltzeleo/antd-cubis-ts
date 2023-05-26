import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Drawer, Table, Tag } from "antd";
import React, { useState } from "react";

import light from "../../src/tokens/light.json";
import "./MyForm.css";

interface Appointment {
  key: string;
  appointmentDate: string;
  appointmentLocation: string;
  appointmentTime: string;
  customerName: string;
  status: string;
  typeOfService: string;
}

interface Plumber {
  key: string;
  name: string;
  avatar: string;
  assignedAppointments: number;
  cancelledAppointments: number;
  failedAppointments: number;
  reassignedAppointments: number;
  rescheduledAppointments: number;

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
      reassignedAppointments: 0,
      rescheduledAppointments: 0,
      failedAppointments: 0,

      appointments: [
        {
          key: "1",
          customerName: "Muhammad Bin Amir",
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "reassigning",
          typeOfService: "New Water Supply",
        },
        {
          key: "2",
          customerName: "Siti Binti Abdul Hafiz",
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "reassigning",
          typeOfService: "New Water Supply",
        },
        {
          key: "3",
          customerName: "Rajesh a/l Suppiah ",
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "assigned",
          typeOfService: "New Water Supply",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "2",
      name: "Kel Huang",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar
      assignedAppointments: 0,
      cancelledAppointments: 0,
      failedAppointments: 0,
      reassignedAppointments: 0,
      rescheduledAppointments: 0,

      appointments: [
        {
          key: "1",
          customerName: "Ahmad bin Abdullah",
          appointmentDate: "2023-05-24",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
          typeOfService: "New Water Supply",
        },
        {
          key: "2",
          customerName: "Tan Ah Ching",
          appointmentDate: "2023-05-26",
          appointmentTime: "1:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
          typeOfService: "New Water Supply",
        },
        {
          key: "3",
          customerName: "Lee Xiao Ming",
          appointmentDate: "2023-05-27",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "cancelled",
          typeOfService: "Temporary Supply",
        },
        {
          key: "4",
          customerName: "Bhavin a/l Ishir",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "cancelled",
          typeOfService: "Temporary Supply",
        },
        {
          key: "5",
          customerName: "Amyra a/p Kiaan",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "cancelled",
          typeOfService: "New Water Supply",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "3",
      name: "Elon Mask",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar
      assignedAppointments: 0,
      cancelledAppointments: 0,
      failedAppointments: 0,
      reassignedAppointments: 0,
      rescheduledAppointments: 0,

      appointments: [
        {
          key: "1",
          customerName: "Steve Jobs",
          appointmentDate: "2023-05-24",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
          typeOfService: "Temporary Supply",
        },
        {
          key: "2",
          customerName: "Mark Zuckerberg",
          appointmentDate: "2023-05-26",
          appointmentTime: "1:00 PM",
          appointmentLocation: "Location 1",
          status: "assigned",
          typeOfService: "Temporary Supply",
        },
        {
          key: "3",
          customerName: "Aventure",
          appointmentDate: "2023-05-27",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: "reassigning",
          typeOfService: "Temporary Supply",
        },
        {
          key: "4",
          customerName: "Bamberbee",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "failed to visit",
          typeOfService: "New Water Supply",
        },
        {
          key: "5",
          customerName: "Cinderlala",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "cancelled",
          typeOfService: "New Water Supply",
        },
        {
          key: "5",
          customerName: "Doraemon",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "rescheduled",
          typeOfService: "New Water Supply",
        },
        // Add more appointments as needed
      ],
    },
    // Add more plumbers with their appointments
  ];

  data.forEach((plumber) => {});

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      {
        title: "Customer Name",
        dataIndex: "customerName",
        sorter: (a: Appointment, b: Appointment) =>
          a.customerName.localeCompare(b.customerName),
      },
      {
        title: "Appointment Date",
        dataIndex: "appointmentDate",
        sorter: (a: Appointment, b: Appointment) =>
          a.appointmentDate.localeCompare(b.appointmentDate),
      },
      {
        title: "Appointment Time",
        dataIndex: "appointmentTime",
        sorter: (a: Appointment, b: Appointment) =>
          a.appointmentTime.localeCompare(b.appointmentTime),
      },
      {
        title: "Appointment Location",
        dataIndex: "appointmentLocation",
        sorter: (a: Appointment, b: Appointment) =>
          a.appointmentLocation.localeCompare(b.appointmentLocation),
      },
      {
        title: "Type of Service",
        dataIndex: "typeOfService",
        sorter: (a: Appointment, b: Appointment) =>
          a.typeOfService.localeCompare(b.typeOfService),
      },

      {
        title: (
          <div>
            <span>Status</span>
            <SearchOutlined style={{ marginLeft: 4.                 justifyContent: "flex-start",
  }} />
          </div>
        ),
        dataIndex: "status",

        sorter: (a: Appointment, b: Appointment) =>
          a.status.localeCompare(b.status),
        render: (status: string) => {
          let color = "";
          switch (status) {
            case "assigned":
              color = light["cyan"];
              break;
            case "cancelled":
              color = light["red"];
              break;
            case "failed to visit":
              color = light["orange"];
              break;
            case "reassigning":
              color = light["geekblue"];
              break;
            case "rescheduled":
              color = light["lime"];
              break;
            default:
              break;
          }
          return <Tag color={color}>{status}</Tag>;
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        width: 100,
        fixed: "right" as const,
        render: () => <Button type="link">Action</Button>,
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
          onChange={() => {}} // Empty onChange handler to disable default sorting behavior
          scroll={{ x: "max-content" }}
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
        const reassigningCount = record.appointments.filter(
          (appointment) => appointment.status === "reassigning"
        ).length;
        const rescheduledCount = record.appointments.filter(
          (appointment) => appointment.status === "rescheduled"
        ).length;
        const failedCount = record.appointments.filter(
          (appointment) => appointment.status === "failed to visit"
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
              <span style={{ fontStyle: "normal" }}>
                <b>
                  <span className="textEffect">{name} </span>
                </b>
                has a total of {totalAppointmentCount} appointment
                {record.appointments.length !== 1 ? "s" : ""}
              </span>
            </Button>
            <span
              style={{
                textDecoration: "none",
                marginLeft: 4,
                marginTop: 8,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Tag color={light["cyan"]}>
                <b>{assignedCount}</b> assigned
              </Tag>{" "}
              &nbsp;
              <Tag color={light["red"]}>
                <b>{cancelledCount}</b> cancelled
              </Tag>{" "}
              &nbsp;
              <Tag color={light["orange"]}>
                <b>{failedCount}</b> failed to visit
              </Tag>{" "}
              &nbsp;
              <Tag color={light["geekblue"]}>
                <b>{reassigningCount}</b> reassigning
              </Tag>{" "}
              &nbsp;
              <Tag color={light["lime"]}>
                <b>{rescheduledCount}</b> rescheduled
              </Tag>{" "}
              &nbsp;
            </span>
          </div>
        );
      },
    },
  ];

  const openAddAppointmentDrawer = (record: Plumber) => {
    setAddAppointmentDrawerVisible(true);
    setDrawerData(record);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setDrawerData(null);
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          pagination={false}
          onChange={() => {}} // Empty onChange handler to disable default sorting behavior
        />

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
          width={880}
          placement="right"
          closable={true}
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <p>Plumber Info: {drawerData?.name}</p>
          <Button
            style={{ textDecorationLine: "true" }}
            type="primary"
            onClick={() => drawerData && openAddAppointmentDrawer(drawerData)}
          >
            Add Appointment
          </Button>

          {/* Add/Edit buttons and other content */}
        </Drawer>
        <Drawer
          title={`Add Appointment for ${drawerData?.name}`}
          width={810}
          placement="right"
          closable={true}
          onClose={() => setAddAppointmentDrawerVisible(false)}
          visible={addAppointmentDrawerVisible}
        >
          {/* Add appointment form and content */}
          <p>Add Appointment Form</p>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentUpdates;
