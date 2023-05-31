// AppointmentUpdates.tsx
import { ProFormItem } from "@ant-design/pro-form";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Drawer,
  Input,
  List,
  Row,
  Space,
  Table,
  Tag,
} from "antd";

import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useState } from "react";
import { StatusLabels } from "../../customConstants/constants";

import light from "../../../src/tokens/light.json";
import "../MyForm.css";

interface Appointment {
  key: string;
  appointmentDate: string;
  appointmentLocation: string;
  appointmentTime: string;
  customerName: string;
  status: StatusLabels;
  typeOfService: string;
}

interface Plumber {
  key: string;
  name: string;
  avatar: string;
  appointments: Appointment[];
}

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
          appointmentDate: "2023-05-24",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: StatusLabels.FAILED_TO_VISIT,
          typeOfService: "New Water Supply",
        },
        {
          key: "1b",
          customerName: "Siti Binti Abdul Hafiz",
          appointmentDate: "2023-05-25",
          appointmentTime: "11:00 AM",
          appointmentLocation: "Location 1",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
        },
        {
          key: "1c",
          customerName: "Rajesh a/l Suppiah ",
          appointmentDate: "2023-05-25",
          appointmentTime: "4:00 PM",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "New Water Supply",
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
          appointmentDate: "2023-05-24",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 1",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
        },
        {
          key: "2b",
          customerName: "Tan Ah Ching",
          appointmentDate: "2023-05-26",
          appointmentTime: "1:00 PM",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "New Water Supply",
        },
        {
          key: "2c",
          customerName: "Lee Xiao Ming",
          appointmentDate: "2023-05-27",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "Temporary Supply",
        },
        {
          key: "2d",
          customerName: "Bhavin a/l Ishir",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: StatusLabels.RESCHEDULED,
          typeOfService: "Temporary Supply",
        },
        {
          key: "2e",
          customerName: "Amyra a/p Kiaan",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: StatusLabels.ASSIGNED,
          typeOfService: "New Water Supply",
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
          appointmentDate: "2023-05-24",
          appointmentTime: "2:00 PM",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "Temporary Supply",
        },
        {
          key: "3b",
          customerName: "Mark Zuckerberg",
          appointmentDate: "2023-05-26",
          appointmentTime: "1:00 PM",
          appointmentLocation: "Location 1",
          status: StatusLabels.ASSIGNED,
          typeOfService: "Temporary Supply",
        },
        {
          key: "3c",
          customerName: "Aventure",
          appointmentDate: "2023-05-27",
          appointmentTime: "10:00 AM",
          appointmentLocation: "Location 1",
          status: StatusLabels.CANCELLED,
          typeOfService: "Temporary Supply",
        },
        {
          key: "3d",
          customerName: "Bamberbee",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: StatusLabels.FAILED_TO_VISIT,
          typeOfService: "New Water Supply",
        },
        {
          key: "3e",
          customerName: "Cinderlala",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: StatusLabels.REASSIGNING,
          typeOfService: "New Water Supply",
        },
        {
          key: "3f",
          customerName: "Doraemon",
          appointmentDate: "2025-05-28",
          appointmentTime: "12:00PM",
          appointmentLocation: "Location 3",
          status: StatusLabels.RESCHEDULED,
          typeOfService: "New Water Supply",
        },
        // Add more appointments as needed
      ],
    },
    // Add more plumbers with their appointments
  ];

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Plumber[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Perform search logic here
    const results = data.filter((plumber) =>
      plumber.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
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
                backgroundColor: light["colorPrimaryBg"],
              }}
            />
          </div>
        ),

        filtered: plumberStatusFilters.length > 0,

        onFilter: (value: string | number | boolean, record: Appointment) =>
          plumberStatusFilters.includes(record.status),
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
                onClick={() => handleTagFilterMaster(StatusLabels.ASSIGNED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? "white"
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? light["cyan"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.ASSIGNED
                  )
                    ? light["cyan"]
                    : light["colorTextDisabled"],
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
                      ? light["cyan"]
                      : light["colorTextDisabled"],
                  }}
                >
                  <b>{assignedCount}</b>
                </span>{" "}
                assigned
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["red"]}
                onClick={() => handleTagFilterMaster(StatusLabels.CANCELLED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? "white"
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? light["red"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.CANCELLED
                  )
                    ? light["red"]
                    : light["colorTextDisabled"],
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
                      ? light["red"]
                      : light["colorTextDisabled"],
                  }}
                >
                  <b>{cancelledCount}</b>
                </span>{" "}
                cancelled
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["orange"]}
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
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.FAILED_TO_VISIT
                  )
                    ? light["orange"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.FAILED_TO_VISIT
                  )
                    ? light["orange"]
                    : light["colorTextDisabled"],
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
                      ? light["orange"]
                      : light["colorTextDisabled"],
                  }}
                >
                  <b>{failedCount}</b>
                </span>{" "}
                failed to visit
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["geekblue"]}
                onClick={() => handleTagFilterMaster(StatusLabels.REASSIGNING)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? "white"
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? light["geekblue"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.REASSIGNING
                  )
                    ? light["geekblue"]
                    : light["colorTextDisabled"],
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
                      ? light["geekblue"]
                      : light["colorTextDisabled"],
                  }}
                >
                  <b>{reassigningCount}</b>
                </span>{" "}
                reassigning
              </Tag>{" "}
              &nbsp;
              <Tag
                color={light["lime"]}
                onClick={() => handleTagFilterMaster(StatusLabels.RESCHEDULED)}
                style={{
                  borderRadius: 8,
                  height: "auto",
                  padding: "2 8 2 8",

                  color: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? "white"
                    : light["colorTextDisabled"],
                  backgroundColor: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? light["lime"]
                    : undefined,
                  borderColor: statusFilters[record.key]?.includes(
                    StatusLabels.RESCHEDULED
                  )
                    ? light["lime"]
                    : light["colorTextDisabled"],
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
                      ? light["lime"]
                      : light["colorTextDisabled"],
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
    <ConfigProvider theme={{ token: light }}>
      <Space direction="horizontal">
        <div style={{ background: "", margin: "10px 10px" }}>
          <Row style={{ alignItems: "center" }}>
            <ProFormItem>
              <Col>
                <Input.Search
                  style={{ marginTop: 32 }}
                  allowClear
                  enterButton="Search"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                  placeholder="Enter a plumber's name"
                />
              </Col>
            </ProFormItem>
          </Row>
          {searchResults.length > 0 && (
            <List
              style={{ marginTop: 16 }}
              bordered
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={item.appointments.join(", ")}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Space>
      <div>
        <Table
          columns={columns}
          dataSource={data}
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
