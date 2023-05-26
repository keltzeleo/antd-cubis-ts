import { Avatar, Button, ConfigProvider, Drawer, Table, Tag, Input } from "antd";
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

  const [searchText, setSearchText] = useState(""); // State for search input
  const [searchedColumn, setSearchedColumn] = useState(""); // State to track the searched column
  const [sortedInfo, setSortedInfo] = useState<any>({}); // State for sorting

  const data: Plumber[] = [
    // Data omitted for brevity
  ];

  // ...

  const expandedRowRender = (record: Plumber) => {
    const nestedColumns = [
      // Columns definition
      // ...

      // Add sorter and filterDropdown properties to each column
      {
        title: "Customer Name",
        dataIndex: "customerName",
        sorter: (a: Appointment, b: Appointment) =>
          a.customerName.localeCompare(b.customerName),
        filteredValue:
          searchedColumn === "customerName" ? [searchText] : null,
        onFilter: (value: string, record: Appointment) =>
          record.customerName.toLowerCase().includes(value.toLowerCase()),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search customer name"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={confirm}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={clearFilters}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        render: (text: string) =>
          searchedColumn === "customerName" ? (
            <div className="highlight">{text}</div>
          ) : (
            text
          ),
      },
      // Add more columns with sorter and filterDropdown properties
    ];

    // ...

    return (
      <div>
        {/* ... */}
        <Table
          dataSource={record.appointments}
          columns={nestedColumns}
          pagination={false}
          onChange={(pagination, filters, sorter) =>
            setSortedInfo(sorter)
          }
        />
      </div>
    );
  };

  const columns = [
    // ...

    // Add sorter and filterDropdown properties to the name column
    {
      title: "",
      dataIndex: "name",
      sorter: (a: Plumber, b: Plumber) => a.name.localeCompare(b.name),
      filteredValue: searchedColumn === "name" ? [searchText] : null,
      onFilter: (value: string, record: Plumber) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search plumber name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      render: (name: string, record: Plumber) => {
        // ...
      },
    },
  ];

  // ...

  return (
    // ...
  );
};

export default AppointmentUpdates;
