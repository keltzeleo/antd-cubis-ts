import { Avatar, Button, ConfigProvider, Drawer, Table, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import light from "../../src/tokens/light.json";
import "./MyForm.css";

interface Appointment {
  key: React.Key;
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
  const [statusFilters, setStatusFilters] = useState<string[]>([
    "assigned",
    "cancelled",
    "failed to visit",
    "reassigning",
    "rescheduled",
  ]);

  const data: Plumber[] = [
    // Existing data
  ];

  data.forEach((plumber) => {});

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns: ColumnsType<Appointment> = [
      {
        title: "Customer Name",
        dataIndex: "customerName",
        sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      },
      {
        title: "Appointment Date",
        dataIndex: "appointmentDate",
        sorter: (a, b) => a.appointmentDate.localeCompare(b.appointmentDate),
      },
      {
        title: "Appointment Time",
        dataIndex: "appointmentTime",
        sorter: (a, b) => a.appointmentTime.localeCompare(b.appointmentTime),
      },
      {
        title: "Appointment Location",
        dataIndex: "appointmentLocation",
        sorter: (a, b) =>
          a.appointmentLocation.localeCompare(b.appointmentLocation),
      },
      {
        title: "Type of Service",
        dataIndex: "typeOfService",
        sorter: (a, b) => a.typeOfService.localeCompare(b.typeOfService),
      },
      {
        title: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Status</span>
          </div>
        ),
        dataIndex: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
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
        filters: [
          { text: "Assigned", value: "assigned" },
          { text: "Cancelled", value: "cancelled" },
          { text: "Failed to Visit", value: "failed to visit" },
          { text: "Reassigning", value: "reassigning" },
          { text: "Rescheduled", value: "rescheduled" },
        ],
        onFilter: (value, record) => record.status.startsWith(value),
        filterSearch: true,
        width: "40%",
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
          dataSource={record.appointments.filter((appointment) =>
            statusFilters.includes(appointment.status)
          )}
          columns={nestedColumns}
          pagination={false}
          onChange={() => {}}
          scroll={{ x: "max-content" }}
        />
      </div>
    );
  };

  const columns: ColumnsType<Plumber> = [
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
          <>
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
                  <span className="textEffect">{name}</span>
                </b>
                <span> has a total of {totalAppointmentCount} appointment</span>
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
          </>
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
          onChange={() => {}}
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
          closable={false}
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
        </Drawer>
        <Drawer
          title={
            <div>
              Add Appointment for
              <div
                style={{
                  height: 30,
                  width: "auto",
                  padding: " 1px 4px 1px 4px",
                  alignContent: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  borderRadius: 16,
                  background: light["colorPrimaryBase"],
                  overflow: "hidden",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: 40,

                    alignContent: "center",
                    justifyContent: "center",
                    margin: "-20px 0px 0px 10px",
                  }}
                >
                  {drawerData?.name}
                </div>
              </div>
            </div>
          }
          width={810}
          placement="right"
          closable={true}
          onClose={() => setAddAppointmentDrawerVisible(false)}
          visible={addAppointmentDrawerVisible}
        >
          <div>Add Appointment for {drawerData?.name}</div>
          <p>Add Appointment Form</p>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentUpdates;
