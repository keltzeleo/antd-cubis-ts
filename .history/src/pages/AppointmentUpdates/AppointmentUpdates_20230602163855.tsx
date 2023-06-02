// AppointmentUpdates.tsx
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useState } from "react";
import { StatusLabels } from "../../customConstants/constants";

import dark from "../../../src/tokens/dark.json";
import light from "../../../src/tokens/light.json";

import "../MyForm.css";

interface Appointment {
  key: string;
  datePlanned: string;
  appointmentLocation: string;
  icNumber: string;
  customerName: string;
  status: StatusLabels;
  typeOfService: string;
  rearrangementCount: string;
}

interface Plumber {
  key: string;
  name: string;
  avatar: string;
  appointments: Appointment[];
}

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div style={{ display: "flex", alignItems: "center", margin: 8 }}>
    <span style={{ flexShrink: 0, marginRight: "8px" }}>{title}:</span>
    <span>{content}</span>
  </div>
);

const getRandomColor = (): string => {
  const colors = Object.values(light);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as string;
};

/**
 * FilterableTagProps describes the properties for the FilterableTag component.
 * @property color - The color of the tag.
 * @property label - The label of the tag.
 * @property checked - Whether the checkbox is checked.
 * @property onCheckboxChange - The handler for checkbox changes.
 */

/**
 * FilterableTag is a component that displays a tag with a checkbox.
 * The checkbox can be used to select or deselect the tag.
 * @param color - The color of the tag.
 * @param label - The label of the tag.
 * @param checked - Whether the checkbox is checked.
 * @param onCheckboxChange - The handler for checkbox changes.
 */
const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const AppointmentUpdates: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<Plumber | null>(null);
  const [addAppointmentDrawerVisible, setAddAppointmentDrawerVisible] =
    useState(false);
  const [statusFilters, setStatusFilters] = useState<{
    [key: string]: StatusLabels[];
  }>({
    "1": [
      StatusLabels.ASSIGNED,
      StatusLabels.CANCELLED,
      StatusLabels.FAILED_TO_VISIT,
      StatusLabels.REASSIGNING,
      StatusLabels.RESCHEDULED,
    ],
    "2": [
      StatusLabels.ASSIGNED,
      StatusLabels.CANCELLED,
      StatusLabels.FAILED_TO_VISIT,
      StatusLabels.REASSIGNING,
      StatusLabels.RESCHEDULED,
    ],
    "3": [
      StatusLabels.ASSIGNED,
      StatusLabels.CANCELLED,
      StatusLabels.FAILED_TO_VISIT,
      StatusLabels.REASSIGNING,
      StatusLabels.RESCHEDULED,
    ],
  });

  /**
   * handleTagFilterExclusive updates the status filters for a given plumber when a tag is selected or deselected.
   * @param tagValue - The value of the tag that changed.
   * @param plumberKey - The key of the plumber for which to update the status filters.
   */
  const handleTagFilterExclusive = (
    tagValue: StatusLabels,
    plumberKey: string
  ) => {
    setStatusFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      Object.keys(updatedFilters).forEach((plumberKey) => {
        const plumberFilters = updatedFilters[plumberKey] || [];
        if (plumberFilters.includes(tagValue)) {
          updatedFilters[plumberKey] = plumberFilters.filter(
            (filter) => filter !== tagValue
          ) as StatusLabels[];
        } else {
          updatedFilters[plumberKey] = [...plumberFilters, tagValue];
        }
      });
      return updatedFilters;
    });
  };

  const tags = [
    { value: "assigned", label: "Assigned", color: dark["cyan"] },
    { value: "cancelled", label: "Cancelled", color: dark["red"] },
    {
      value: "failed to visit",
      label: "Failed to Visit",
      color: dark["orange"],
    },
    { value: "reassigning", label: "Reassigning", color: dark["geekblue"] },
    { value: "rescheduled", label: "Rescheduled", color: dark["lime"] },
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const data: Plumber[] = [
    {
      key: "1",
      name: "John Doe",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar
      appointments: [
        {
          key: "1a",
          customerName: "Muhammad Bin Amir",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-24",
          appointmentLocation: "Location 1",
          typeOfService: "New Water Supply",
          status: StatusLabels.FAILED_TO_VISIT,
          rearrangementCount: "2",
        },
        {
          key: "1b",
          customerName: "Siti Binti Abdul Hafiz",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-25",
          appointmentLocation: "Location 1",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
          rearrangementCount: "21",
        },
        {
          key: "1c",
          customerName: "Rajesh a/l Suppiah ",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-25",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "New Water Supply",
          rearrangementCount: "0",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "2",
      name: "Kel Huang",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar

      appointments: [
        {
          key: "2a",
          customerName: "Ahmad bin Abdullah",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-24",
          appointmentLocation: "Location 1",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
          rearrangementCount: "1",
        },
        {
          key: "2b",
          customerName: "Tan Ah Ching",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-26",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "New Water Supply",
          rearrangementCount: "0",
        },
        {
          key: "2c",
          customerName: "Lee Xiao Ming",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-27",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "Temporary Supply",
          rearrangementCount: "4",
        },
        {
          key: "2d",
          customerName: "Bhavin a/l Ishir",
          icNumber: "1112233-44-5566",
          datePlanned: "2025-05-28",
          appointmentLocation: "Location 3",
          status: StatusLabels.RESCHEDULED,
          typeOfService: "Temporary Supply",
          rearrangementCount: "1",
        },
        {
          key: "2e",
          customerName: "Amyra a/p Kiaan",
          icNumber: "112233-44-5566",
          datePlanned: "2025-05-28",
          appointmentLocation: "Location 3",
          status: StatusLabels.ASSIGNED,
          typeOfService: "New Water Supply",
          rearrangementCount: "0",
        },
        // Add more appointments as needed
      ],
    },
    {
      key: "3",
      name: "Elon Mask",
      avatar: "./icons/avatarMeow01.png", // Replace with the actual URL or identifier for the avatar

      appointments: [
        {
          key: "3a",
          customerName: "Steve Jobs",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-24",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "Temporary Supply",
          rearrangementCount: "0",
        },
        {
          key: "3b",
          customerName: "Mark Zuckerberg",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-26",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "Temporary Supply",
          rearrangementCount: "0",
        },
        {
          key: "3c",
          customerName: "Aventure",
          icNumber: "112233-44-5566",
          datePlanned: "2023-05-27",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "Temporary Supply",
          rearrangementCount: "0",
        },
        {
          key: "3d",
          customerName: "Bamberbee",
          icNumber: "112233-44-5566",
          datePlanned: "2025-05-28",
          appointmentLocation: "Location 3",
          status: StatusLabels.FAILED_TO_VISIT,
          typeOfService: "New Water Supply",
          rearrangementCount: "0",
        },
        {
          key: "3e",
          customerName: "Cinderlala",
          icNumber: "112233-44-5566",
          datePlanned: "2025-05-28",
          appointmentLocation: "Location 3",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
          rearrangementCount: "1",
        },
        {
          key: "3f",
          customerName: "Doraemon",
          icNumber: "112233-44-5566",
          datePlanned: "2025-05-28",
          appointmentLocation: "Location 3",
          status: StatusLabels.RESCHEDULED,
          typeOfService: "New Water Supply",
          rearrangementCount: "1",
        },
        // Add more appointments as needed
      ],
    },
    // Add more plumbers with their appointments
  ];

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Plumber[]>(data);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Perform search logic here
    const filteredResults = data.filter((plumber) =>
      plumber.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const expandedRowRender = (record: Plumber) => {
    const plumberStatusFilters = statusFilters[record.key] || [];

    const nestedColumns = [
      {
        title: "Customer Name",
        dataIndex: "customerName",
        sorter: (a: Appointment, b: Appointment) =>
          a.customerName.localeCompare(b.customerName),
      },
      {
        title: "IC Number",
        dataIndex: "icNumber",
        sorter: (a: Appointment, b: Appointment) =>
          a.icNumber.localeCompare(b.icNumber),
      },
      {
        title: "Date Planned",
        dataIndex: "datePlanned",
        sorter: (a: Appointment, b: Appointment) =>
          a.datePlanned.localeCompare(b.datePlanned),
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
              color = dark["cyan"];
              break;
            case "cancelled":
              color = dark["red"];
              break;
            case "failed to visit":
              color = dark["orange"];
              break;
            case "reassigning":
              color = dark["geekblue"];
              break;
            case "rescheduled":
              color = dark["lime"];
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
              value={plumberStatusFilters}
              onChange={(checkedValues: CheckboxValueType[]) => {
                setStatusFilters((prevFilters) => ({
                  ...prevFilters,
                  [record.key]: checkedValues as StatusLabels[],
                }));
              }}
              style={{
                display: "run-in",
                flexDirection: "row",
                padding: 8,
                backgroundColor: dark["colorPrimaryBg"],
              }}
            />
          </div>
        ),

        filtered: plumberStatusFilters.length > 0,

        onFilter: (value: string | number | boolean, record: Appointment) =>
          plumberStatusFilters.includes(record.status),
      },
      {
        title: "Rearrangement Count",
        dataIndex: "rearrangementCount",
        sorter: (a: Appointment, b: Appointment) =>
          a.rearrangementCount.localeCompare(b.rearrangementCount),
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
            statusFilters[record.key]?.includes(appointment.status)
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
              style={{ backgroundColor: getRandomColor(), marginTop: 8 }}
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
                color={dark["cyan"]}
                onClick={() => handleTagFilterMaster(StatusLabels.ASSIGNED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? "white"
                    : dark["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? dark["cyan"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? dark["cyan"]
                    : dark["colorTextDisabled"],
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: statusFilters[record.key]?.includes(
                      StatusLabels.ASSIGNED
                    )
                      ? "#fff"
                      : undefined,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    color: statusFilters[record.key]?.includes(
                      StatusLabels.ASSIGNED
                    )
                      ? dark["cyan"]
                      : dark["colorTextDisabled"],
                  }}
                >
                  <b>{assignedCount}</b>
                </span>{" "}
                assigned
              </Tag>{" "}
              &nbsp;
              <Tag
                color={dark["red"]}
                onClick={() => handleTagFilterMaster(StatusLabels.CANCELLED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? "white"
                    : dark["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? dark["red"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? dark["red"]
                    : dark["colorTextDisabled"],
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: statusFilters[record.key]?.includes(
                      StatusLabels.CANCELLED
                    )
                      ? "#fff"
                      : undefined,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    color: statusFilters[record.key]?.includes(
                      StatusLabels.CANCELLED
                    )
                      ? dark["red"]
                      : dark["colorTextDisabled"],
                  }}
                >
                  <b>{cancelledCount}</b>
                </span>{" "}
                cancelled
              </Tag>{" "}
              &nbsp;
              <Tag
                color={dark["orange"]}
                onClick={() =>
                  handleTagFilterMaster(StatusLabels.FAILED_TO_VISIT)
                }
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.FAILED_TO_VISIT
                  )
                    ? "white"
                    : dark["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.FAILED_TO_VISIT
                  )
                    ? dark["orange"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.FAILED_TO_VISIT
                  )
                    ? dark["orange"]
                    : dark["colorTextDisabled"],
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: statusFilters[record.key]?.includes(
                      StatusLabels.FAILED_TO_VISIT
                    )
                      ? "#fff"
                      : undefined,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    color: statusFilters[record.key]?.includes(
                      StatusLabels.FAILED_TO_VISIT
                    )
                      ? dark["orange"]
                      : dark["colorTextDisabled"],
                  }}
                >
                  <b>{failedCount}</b>
                </span>{" "}
                failed to visit
              </Tag>{" "}
              &nbsp;
              <Tag
                color={dark["geekblue"]}
                onClick={() => handleTagFilterMaster(StatusLabels.REASSIGNING)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? "white"
                    : dark["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? dark["geekblue"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? dark["geekblue"]
                    : dark["colorTextDisabled"],
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: statusFilters[record.key]?.includes(
                      StatusLabels.REASSIGNING
                    )
                      ? "#fff"
                      : undefined,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    color: statusFilters[record.key]?.includes(
                      StatusLabels.REASSIGNING
                    )
                      ? dark["geekblue"]
                      : dark["colorTextDisabled"],
                  }}
                >
                  <b>{reassigningCount}</b>
                </span>{" "}
                reassigning
              </Tag>{" "}
              &nbsp;
              <Tag
                color={dark["lime"]}
                onClick={() => handleTagFilterMaster(StatusLabels.RESCHEDULED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? "white"
                    : dark["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? dark["lime"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? dark["lime"]
                    : dark["colorTextDisabled"],
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: statusFilters[record.key]?.includes(
                      StatusLabels.RESCHEDULED
                    )
                      ? "#fff"
                      : undefined,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    marginRight: 4,
                    color: statusFilters[record.key]?.includes(
                      StatusLabels.RESCHEDULED
                    )
                      ? dark["lime"]
                      : dark["colorTextDisabled"],
                  }}
                >
                  <b>{rescheduledCount}</b>{" "}
                </span>
                rescheduled
              </Tag>{" "}
              &nbsp;
            </span>
          </>
        );
      },
    },
  ];

  const handleTagFilterMaster = (status: StatusLabels) => {
    setStatusFilters((prevFilters) => {
      const updatedFilters: { [key: string]: StatusLabels[] } = {};
      Object.keys(prevFilters).forEach((plumberKey) => {
        const plumberFilters = prevFilters[plumberKey] || [];
        if (plumberFilters.includes(status)) {
          updatedFilters[plumberKey] = plumberFilters.filter(
            (filter) => filter !== status
          );
        } else {
          updatedFilters[plumberKey] = [...plumberFilters, status];
        }
      });
      return updatedFilters;
    });
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
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: "#f3f3f3",
          colorPrimary: "#00a991",
          colorError: "#ea7480",
          colorSuccess: "#7fb86d",
          colorWarning: "#ffaa64",
          colorInfo: "#00a991",
          borderRadius: 8,
        },
      }}
    >
      <div style={{ background: "", margin: "10px 10px" }}>
        <>
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                <Space.Compact size="large">
                  <Row align="middle">
                    <span>
                      <Input
                        style={{ marginTop: 24, width: "350px" }}
                        allowClear
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Plumber's Name for Quick Search"
                        addonBefore={<SearchOutlined />}
                      />
                    </span>
                  </Row>
                </Space.Compact>
              </span>
            </div>
          </Form.Item>
        </>
      </div>
      <div>
        <Table
          style={{ margin: 10 }}
          columns={columns}
          dataSource={filteredData}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: data.map((plumber) => plumber.key),
          }}
          pagination={false}
          onChange={() => {}}
          size="small"
        />
        <Drawer
          title={
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 24 }}
            >
              <Avatar
                size={32}
                src={drawerData?.avatar}
                style={{
                  backgroundColor: getRandomColor(),
                  marginLeft: -2,
                  marginRight: 16,
                }}
              />
              <div
                style={{
                  height: 30,
                  width: "100vh",
                  padding: " 1px 4px 1px 4px",
                  alignContent: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  borderRadius: 16,
                  background: dark["colorPrimaryBase"],
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
          width={880}
          placement="right"
          closable={false}
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <div>
            <Button
              type="primary"
              onClick={() => drawerData && openAddAppointmentDrawer(drawerData)}
            >
              Add Appointment
            </Button>
          </div>
          &nbsp;
          <Divider orientation="left" orientationMargin="0">
            {" "}
            <div className="font-Play-header">Plumber Info</div>
            {/* Updated line */}
          </Divider>
          <div style={{ marginLeft: 8, marginTop: 0 }}>
            {/* Add/Edit buttons and other content */}

            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Plumber Name"
                  content={drawerData?.name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Plumber ID" content="1213141516" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Contract Sign Date"
                  content="12-12-2019"
                />
              </Col>
              <Col span={12}>
                <DescriptionItem title="License Number" content="pl-3872636" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="License End Date"
                  content="12-12-2029"
                />
              </Col>
            </Row>
          </div>
        </Drawer>
        <Drawer
          title={
            <div>
              Add Appointment for
              <div
                style={{
                  height: 30,
                  width: "100vh",
                  padding: " 1px 4px 1px 4px",
                  alignContent: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  borderRadius: 16,
                  background: dark["colorPrimaryBase"],
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
