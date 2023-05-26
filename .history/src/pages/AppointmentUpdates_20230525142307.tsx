import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  Drawer,
  Menu,
  Table,
  Tag,
} from "antd";
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
  reassignedAppointments: number;
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

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
          status: "cancelled",
          typeOfService: "Temporary Supply",
        },
        {
          key: "4",
          customerName: "Bamberbee",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: "failed",
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
          status: "assigned",
          typeOfService: "New Water Supply",
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
      // Existing columns...
      {
        title: "Status",
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
            case "failed":
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
        filterDropdown: () => (
          <Menu>
            <Menu.Item key="status-filter">
              <Checkbox.Group
                options={[
                  { label: "Assigned", value: "assigned" },
                  { label: "Cancelled", value: "cancelled" },
                  { label: "Failed", value: "failed" },
                  { label: "Reassigning", value: "reassigning" },
                  { label: "Rescheduled", value: "rescheduled" },
                ]}
                value={selectedStatuses}
                onChange={(values) => setSelectedStatuses(values as string[])}
              />
            </Menu.Item>
          </Menu>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined
            style={{ color: filtered ? light["geekblue"] : undefined }}
          />
        ),
        filteredValue: selectedStatuses,
        onFilter: (value: string | number | boolean, record: Appointment) => {
          return selectedStatuses.includes(record.status);
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
          onChange={() => {}} // Empty onChange handler to disable default sorting behavior
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
                <b>
                  <u>
                    <span className="textEffect">{name}</span>
                  </u>{" "}
                </b>{" "}
                has a total of {totalAppointmentCount} appointment
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
              <Tag color={light["cyan"]}>{assignedCount} assigned</Tag> &nbsp;
              <Tag color={light["red"]}>{cancelledCount} cancelled</Tag> &nbsp;
              <Tag color={light["orange"]}>
                {failedCount} failed to visit
              </Tag>{" "}
              &nbsp;
              <Tag color={light["geekblue"]}>
                {reassigningCount} reassigning
              </Tag>{" "}
              &nbsp;
              <Tag color={light["lime"]}>
                {rescheduledCount} rescheduled
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
