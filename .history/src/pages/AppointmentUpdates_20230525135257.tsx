import {
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Input,
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const data: Plumber[] = [
    // Data array omitted for brevity
  ];

  data.forEach((plumber) => {
    plumber.assignedAppointments = plumber.appointments.length;
    plumber.cancelledAppointments = plumber.appointments.filter(
      (appointment) => appointment.status === "pending"
    ).length;
  });

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      {
        title: "Customer Name",
        dataIndex: "customerName",
        key: "customerName",
        sorter: (a: Appointment, b: Appointment) =>
          a.customerName.localeCompare(b.customerName),
        sortDirections: ["ascend", "descend"],
        render: (text: string) => <span>{text}</span>,
        onFilter: (value: string, record: Appointment) =>
          record.customerName.toLowerCase().includes(value.toLowerCase()),
        filterDropdown: (props: any) => {
          const { setSelectedKeys, selectedKeys, confirm, clearFilters } =
            props;
          return (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Search customer name"
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Button
                type="primary"
                onClick={() => confirm()}
                size="small"
                style={{ width: 90, marginRight: 8 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters()}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </div>
          );
        },
      },
      // Add more columns with similar configuration
      // ...
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
                has total of {totalAppointmentCount} appointment
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

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    const { column, order } = sorter;
    setSearchedColumn(column ? column.dataIndex : "");
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          pagination={false}
          onChange={handleTableChange}
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
