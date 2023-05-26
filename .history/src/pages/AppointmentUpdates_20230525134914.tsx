import { SearchOutlined } from "@ant-design/icons";
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
    // Data objects
  ];

  data.forEach((plumber) => {
    plumber.assignedAppointments = plumber.appointments.length;
    plumber.cancelledAppointments = plumber.appointments.filter(
      (appointment) => appointment.status === "pending"
    ).length;
  });

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      { title: "Customer Name", dataIndex: "customerName", sorter: true },
      { title: "Appointment Date", dataIndex: "appointmentDate", sorter: true },
      { title: "Appointment Time", dataIndex: "appointmentTime", sorter: true },
      {
        title: "Appointment Location",
        dataIndex: "appointmentLocation",
        sorter: true,
      },
      { title: "Type of Service", dataIndex: "typeOfService", sorter: true },
      {
        title: "Status",
        dataIndex: "status",
        sorter: true,
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
      },
    ];

    const handleAddAppointment = () => {
      setDrawerData(record);
      setDrawerVisible(true);
      setAddAppointmentDrawerVisible(true);
    };

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
      clearFilters();
      setSearchText("");
    };

    const getColumnSearchProps = (dataIndex: any) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value: any, record: any) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            const searchInput = document.getElementById(
              `search-${dataIndex}`
            ) as HTMLInputElement;
            searchInput.select();
          }, 100);
        }
      },
      render: (text: any) =>
        searchedColumn === dataIndex ? (
          <span
            style={{
              fontWeight: "bold",
              backgroundColor: "#ffc069",
              padding: 2,
            }}
          >
            {text}
          </span>
        ) : (
          text
        ),
    });

    nestedColumns.forEach((column: any) => {
      column["..."] = getColumnSearchProps(column.dataIndex);
    });

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
    // Columns
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
