import { Avatar, Button, ConfigProvider, Drawer, Table } from "antd";
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

const getRandomColor = (): string => {
  const colors = Object.values(light);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as string;
};

const AppointmentUpdates: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<Plumber | null>(null);
  const [addAppointmentVisible, setAddAppointmentVisible] = useState(false);

  const data: Plumber[] = [
    // Plumbers data...
  ];

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      // Nested columns data...
    ];

    const handleAddAppointment = (record: Plumber) => {
      setDrawerData(record);
      setDrawerVisible(true);
      openAddAppointmentDrawer(record);
    };

    const closeAddAppointmentDrawer = () => {
      setAddAppointmentVisible(false);
    };

    return (
      <div>
        {/* Add Appointment button */}
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={() => handleAddAppointment(record)}>
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
              openAddAppointmentDrawer(record);
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
    setDrawerData(record);
    setAddAppointmentVisible(true);
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
            onClick={() => handleAddAppointment(drawerData as Plumber)}
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
