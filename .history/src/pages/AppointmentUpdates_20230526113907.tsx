import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  Drawer,
  Table,
  Tag,
} from "antd";

import { CheckboxValueType } from "antd/lib/checkbox/Group";
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

interface FilterableTagProps {
  color: string;
  label: string;
  checked: boolean;
  onCheckboxChange: () => void;
}

const FilterableTag: React.FC<FilterableTagProps> = ({
  color,
  label,
  checked,
  onCheckboxChange,
}) => (
  <Checkbox checked={checked} onChange={onCheckboxChange}>
    <Tag color={color}>
      <b>{label}</b> {label.toLowerCase()}
    </Tag>
  </Checkbox>
);

interface TagFilterProps {
  tags: { value: string; label: string; color: string }[];
  selectedTags: string[];
  onTagChange: (tagValue: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagChange,
}) => (
  <span
    style={{
      marginLeft: 4,
      marginTop: 8,
      display: "flex",
      justifyContent: "flex-start",
    }}
  >
    {tags.map((tag) => (
      <FilterableTag
        key={tag.value}
        color={tag.color}
        label={tag.label}
        checked={selectedTags.includes(tag.value)}
        onCheckboxChange={() => onTagChange(tag.value)}
      />
    ))}
  </span>
);

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tagValue: string) => {
    if (selectedTags.includes(tagValue)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagValue));
    } else {
      setSelectedTags([...selectedTags, tagValue]);
    }
  };

  const tags = [
    { value: "assigned", label: "Assigned", color: light["cyan"] },
    { value: "cancelled", label: "Cancelled", color: light["red"] },
    {
      value: "failed to visit",
      label: "Failed to Visit",
      color: light["orange"],
    },
    { value: "reassigning", label: "Reassigning", color: light["geekblue"] },
    { value: "rescheduled", label: "Rescheduled", color: light["lime"] },
  ];

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
          status: "failed to visit",
          typeOfService: "New Water Supply",
        },
        {
          key: "2",
          customerName: "Siti Binti Abdul Hafiz",
          appointmentDate: "2023-05-25",
          appointmentTime: "11:00 AM",
          appointmentLocation: "Location 1",
          status: "reassigning",
          typeOfService: "New Water Supply",
        },
        {
          key: "3",
          customerName: "Rajesh a/l Suppiah ",
          appointmentDate: "2023-05-25",
          appointmentTime: "4:00 PM",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Status</span>
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
        filterDropdown: () => (
          <div>
            <Checkbox.Group
              options={[
                { label: "Assigned", value: "assigned" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Failed to Visit", value: "failed to visit" },
                { label: "Reassigning", value: "reassigning" },
                { label: "Rescheduled", value: "rescheduled" },
              ]}
              value={statusFilters}
              onChange={(checkedValues: CheckboxValueType[]) => {
                setStatusFilters(checkedValues as string[]);
              }}
              style={{
                display: "run-in",
                flexDirection: "row",
                padding: 8,
                backgroundColor: light["colorPrimaryBg"],
              }}
            />
          </div>
        ),
        filterIcon: () => <SearchOutlined />,
        filtered: statusFilters.length > 0,
        onFilter: (value: string | number | boolean, record: Appointment) =>
          statusFilters.includes(record.status),
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
              <Tag
                color={light["cyan"]}
                onClick={() => handleTagFilter("assigned")}
                style={{
                  borderRadius: 8,
                  height: 32,
                  padding: "0 16 0 8",
                  alignContent: "center",
                  justifyContent: "center",
                  color: statusFilters.includes("assigned")
                    ? "white"
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters.includes("assigned")
                    ? light["colorPrimaryBase"]
                    : undefined,
                  borderColor: light["colorPrimaryBase"],
                }}
              >
                <Checkbox
                  checked={statusFilters.includes("assigned")}
                  onChange={() => handleTagFilter("assigned")}
                />
                <span
                  style={{
                    background: statusFilters.includes("assigned")
                      ? "#fff"
                      : undefined,
                    borderRadius: 8,
                    padding: "2px 6px",
                    marginRight: 4,
                  }}
                >
                  <b>{assignedCount}</b>
                </span>
                assigned
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["red"]}
                onClick={() => handleTagFilter("cancelled")}
              >
                <b>{cancelledCount}</b> cancelled
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["orange"]}
                onClick={() => handleTagFilter("failed to visit")}
              >
                <b>{failedCount}</b> failed to visit
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["geekblue"]}
                onClick={() => handleTagFilter("reassigning")}
              >
                <b>{reassigningCount}</b> reassigning
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["lime"]}
                onClick={() => handleTagFilter("rescheduled")}
              >
                <b>{rescheduledCount}</b> rescheduled
              </Tag>{" "}
              &nbsp;
            </span>
          </>
        );
      },
    },
  ];
  const handleTagFilter = (status: string) => {
    const updatedFilters = [...statusFilters];
    if (updatedFilters.includes(status)) {
      // If the filter is already active, remove it
      updatedFilters.splice(updatedFilters.indexOf(status), 1);
    } else {
      // If the filter is not active, add it
      updatedFilters.push(status);
    }
    setStatusFilters(updatedFilters);
  };

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
            type="primary"
            onClick={() => drawerData && openAddAppointmentDrawer(drawerData)}
          >
            Add Appointment
          </Button>

          {/* Add/Edit buttons and other content */}
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

          {/* Add appointment form and content */}
          <p>Add Appointment Form</p>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentUpdates;
