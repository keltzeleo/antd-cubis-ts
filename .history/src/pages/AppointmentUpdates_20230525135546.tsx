import { Avatar, Button, ConfigProvider, Drawer, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import light from "../../src/tokens/light.json";
import "./MyForm.css";

// ...existing code...

const expandedRowRender = (record: Plumber) => {
  const [searchText, setSearchText] = useState(""); // State for search input value
  const [searchedColumn, setSearchedColumn] = useState(""); // State for currently searched column

  // Function to handle search input change
  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  // Function to reset search filters
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (selectedKeys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: () => void;
      clearFilters: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnTitle}`}
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
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string | number | boolean, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInputRef?.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const nestedColumns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      ...getColumnSearchProps("customerName", "Customer Name"), // Enable search and filtering for this column
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      ...getColumnSearchProps("appointmentDate", "Appointment Date"), // Enable search and filtering for this column
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      ...getColumnSearchProps("appointmentTime", "Appointment Time"), // Enable search and filtering for this column
    },
    {
      title: "Appointment Location",
      dataIndex: "appointmentLocation",
      ...getColumnSearchProps("appointmentLocation", "Appointment Location"), // Enable search and filtering for this column
    },
    {
      title: "Type of Service",
      dataIndex: "typeOfService",
      ...getColumnSearchProps("typeOfService", "Type of Service"), // Enable search and filtering for this column
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Assigned", value: "assigned" },
        { text: "Cancelled", value: "cancelled" },
        { text: "Failed", value: "failed" },
        { text: "Reassigning", value: "reassigning" },
        { text: "Rescheduled", value: "rescheduled" },
      ],
      onFilter: (value: string, record: Appointment) =>
        record.status === value,
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
