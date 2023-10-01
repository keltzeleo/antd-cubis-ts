import {
  CheckCircleTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
} from "antd";
import React, { useState } from "react";
import RealType from "../../../customComponents/RealTimeTextDisplay/RealType";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";

const { Option } = Select;

interface Theme {
  [key: string]: string;
}

interface CompleteWorkOrderProps {
  theme: Theme;
}

const CompleteWorkOrder: React.FC<CompleteWorkOrderProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState("");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");
  const [newMeterNo, setNewMeterNo] = useState("");
  const [newMeterLocation, setNewMeterLocation] = useState("");
  const [initialReading, setInitialReading] = useState("");

  // Sample data (New and Old Meter Data)
  const meterData = {
    oldMeter: {
      meterNumber: "[Old Meter No.]",
      meterStatus: "[Old Meter Status]",
      reading: "[Last Actual Reading]",
      readCode: "[Last Read Code]",
      consumption: "[Replaced Meter Cons.]",
      meterFaulty: "[Meter Faulty Status]",
    },
    newMeter: {
      meterNumber: "[New Meter Number]",
      meterStatus: "[New Meter Status]",
      reading: "[Initial Reading]",
      location: "[New Meter Location]",
      brand: "[Meter Brand]",
      purchaseDate: "[Purchase Date]",
      digitDialLength: "[Digit Dial Length]",
      uom: "[UOM]",
    },
  };

  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      width: 200,
      render: (text: string) => (
        <strong style={{ color: theme["colorTextBase"] }}>{text}</strong>
      ), // <-- This line makes the text bold
    },
    {
      title: "Meter Number",
      dataIndex: "meterNumber",
      key: "meterNumber",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        } else if (record.key === "2") {
          // existing logic for new meter
          return (
            <Input
              defaultValue={text}
              onChange={(e) => {
                // existing logic
              }}
            />
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "Meter Status",
      dataIndex: "meterStatus",
      key: "meterStatus",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        }
        return text;
      },
    },
    {
      title: "Reading",
      dataIndex: "reading",
      key: "reading",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        } else if (record.key === "2") {
          // If the row is for 'newMeter'
          return (
            <Input
              defaultValue={text}
              onChange={(e) => {
                // Handle the change if required
                // e.g., update the state or form values
              }}
            />
          );
        } else {
          return text; // Display plain text for other rows (e.g., 'oldMeter')
        }
      },
    },
    {
      title: "Read Code",
      dataIndex: "readCode",
      key: "readCode",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        }
        return text;
      },
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
      key: "consumption",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        }
        return text;
      },
    },
    {
      title: "Meter Faulty",
      dataIndex: "meterFaulty",
      key: "meterFaulty",
      width: 200,
      render: (text: string, record: any) => {
        if (record.label === "Old Meter Information") {
          return (
            <span style={{ color: theme["colorTextDisabled"] }}>{text}</span>
          );
        }
        return text;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      render: (text: string, record: any) => {
        if (record.key === "2") {
          // If the row is for 'newMeter'
          return (
            <Select
              defaultValue={text}
              style={{ width: 150 }}
              onChange={(value: string) => {
                // Handle the selection change if required
                // e.g., update the state or form values
              }}
            >
              <Option value="location01">Location 01</Option>
              <Option value="location02">Location 02</Option>
              <Option value="location03">Location 03</Option>
              {/* ... Add more options if needed ... */}
            </Select>
          );
        } else {
          return text; // Display plain text for other rows
        }
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 200,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: 200,
    },
    {
      title: "Digit Dial Length",
      dataIndex: "digitDialLength",
      key: "digitDialLength",
      width: 200,
    },
    {
      title: "Unit of Measurement",
      dataIndex: "uom",
      key: "uom",
      width: 200,
    },
  ];

  const dataSource = [
    {
      key: "1",
      label: "Old Meter Information",
      meterNumber: "m12345-2",
      meterStatus: "Deactivated",
      reading: meterData.oldMeter.reading,
      readCode: meterData.oldMeter.readCode,
      consumption: meterData.oldMeter.consumption,
      meterFaulty: meterData.oldMeter.meterFaulty,
      location: "N/A",
      brand: "N/A",
      purchaseDate: "N/A",
      digitDialLength: "N/A",
      uom: "N/A",
    },
    {
      key: "2",
      label: "New Meter Information",
      meterNumber: meterData.newMeter.meterNumber,
      meterStatus: "Active",
      reading: meterData.newMeter.reading,
      readCode: "N/A",
      consumption: "N/A",
      meterFaulty: "N/A",
      location: meterData.newMeter.location,
      brand: meterData.newMeter.brand,
      purchaseDate: meterData.newMeter.purchaseDate,
      digitDialLength: meterData.newMeter.digitDialLength,
      uom: meterData.newMeter.uom,
    },
  ];

  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
    // Add logic to apply the filter and fetch data here
  };

  const handleEmailCheckboxChange = (checked: boolean) => {
    setSendViaEmailSMS(checked);
  };

  const handlePrintCheckboxChange = (checked: boolean) => {
    setPrintForm(checked);
  };

  const handleClearWorkOrderInfo = () => {
    form.setFieldsValue({
      scheduleStartDate: undefined,
      scheduleEndDate: undefined,
      scheduleStartTime: undefined,
      workOrderRemark: undefined,
      departmentInCharge: undefined,
      meterRemark: undefined,
      assignTo: undefined,
    });
  };

  const handleReset = () => {
    // Reset the form and clear the filter
    form.resetFields();
  };

  return (
    <div style={{ marginLeft: 32 }}>
      <h1
        style={{
          marginLeft: -32,
          paddingLeft: 24,
          borderRadius: 32,
          backgroundColor: theme["colorPrimary"],
          color: "#fafafa",
        }}
      >
        Complete Work Order
      </h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        {/* Work Order Type */}
        <h2>Filtering Entry</h2>
        <Row gutter={16}>
          <Col style={{ width: 220 }}>
            <Form.Item
              label="Work Order Type"
              name="workOrderType"
              rules={[{ required: true, message: "Missing Work Order Type" }]}
            >
              <WorkOrderTypeSelection
                onSelect={(selectedWorkOrder, description) => {
                  setSelectedWorkOrder(selectedWorkOrder);
                  setWorkOrderDescription(description);
                }}
                theme={{ cyan: "#00a991" }}
              />
            </Form.Item>
          </Col>
          <Col style={{ width: 260 }}>
            {/* Account Number */}
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  // Use a regular expression to remove non-digit characters
                  const sanitizedValue = e.target.value.replace(/\D/g, "");
                  setAccountNumber(sanitizedValue);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* Alert Message */}
        <Row style={{ marginTop: "-16px", marginBottom: "10px" }}>
          <Col span={24}>
            {accountNumber.length === 0 && (
              <Alert
                message="Account Number Required"
                description="Please enter a valid account number to proceed."
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            )}
          </Col>
        </Row>
        {/* RealType for real-time text display */}
        <RealType
          primaryText={workOrderType}
          secondaryText={workOrderDescription}
          additionalText={accountNumber}
        />
        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16} style={{ paddingLeft: 16, marginTop: 16 }}>
          <Col style={{ width: 420 }}>
            {/* Customer Information */}
            <h2>Account Information</h2>
            <div
              style={{
                height: "auto",
                bottom: 0,
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: 24,
                borderRadius: 16,
                textAlign: "left",
              }}
            >
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        John Doe
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Status">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Active
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Consumer Type">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Individual
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tariff">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Residential
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Book No">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        12345
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Account Type">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Regular
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Arrears">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        RM160.00
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={24} style={{ width: "100%" }}>
                    <Form.Item label="Address">
                      <span
                        style={{
                          background: theme["cyan.3"],
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 4,
                          paddingBottom: 4,
                          borderRadius: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        123 Main St, Area, City, Postcode, State
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col span={18} style={{ marginLeft: 16, alignContent: "center" }}>
            {/* Function Tabs */}
            <h2>
              <CheckCircleTwoTone
                twoToneColor="#00a991"
                style={{ fontSize: "20px" }}
              />{" "}
              <b>COMPLETED</b> Meter Information
            </h2>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              bordered
            />
            <h2 style={{ marginTop: 32 }}>Work Order Information</h2>
            <Form
              layout="vertical"
              style={{
                marginLeft: 0,
                marginTop: 0,
                background: "transparent",
                padding: 32,
              }}
            >
              {/* Display-only fields */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Work Order Type">
                    <span
                      style={{
                        background: theme["cyan.2"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {selectedWorkOrder} - {workOrderDescription}
                    </span>{" "}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Work Order Date">
                    <span
                      style={{
                        background: theme["cyan.2"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      29/09/2023
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Work Order Issue By">
                    <span
                      style={{
                        background: theme["cyan.2"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Jason Ng
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Work Order No">
                    <span
                      style={{
                        background: theme["cyan.2"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      WO36353
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Work Order Status">
                    <span
                      style={{
                        background: theme["orange.3"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Pending
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              {/* Input fields */}
              <Row gutter={16}>
                <Col span={8} style={{ width: "250px" }}>
                  <Form.Item label="Performed Date" name="performedDate">
                    <DatePicker format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ maxWidth: "220px" }}>
                  <Form.Item label="PerformedTime" name="performedTime">
                    <TimePicker
                      format="hh:mm A"
                      use12Hours
                      style={{ width: "100%" }}
                      placeholder="Select time"
                    />{" "}
                  </Form.Item>
                </Col>
                <Col span={8} style={{ width: "250px" }}>
                  <Form.Item label="Performed by" name="performedBy">
                    <Select>{/* Add options here */}</Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Work Order Remark" name="workOrderRemark">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Department In Charge"
                    name="departmentInCharge"
                  >
                    <Select>{/* Add options here */}</Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Meter Remark" name="meterRemark">
                    <Select>{/* Add options here */}</Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Assign To" name="assignTo">
                    <Select>{/* Add options here */}</Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <div>
                  <Form.Item>
                    <Checkbox.Group>
                      <Space direction="horizontal">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "8px",
                            width: "100%",
                            minWidth: "400px",
                            flexWrap: "wrap",
                            padding: 10,
                            marginLeft: 8,
                            marginTop: 16,
                            background: printForm
                              ? theme["colorPrimary"]
                              : "rgba(230,250,250,0.1)",
                            border: "1px solid #e3e6e9",
                            transition: "background 0.3s ease-in-out",
                          }}
                        >
                          <Checkbox
                            value="printForm"
                            checked={printForm}
                            onChange={(e) =>
                              handlePrintCheckboxChange(e.target.checked)
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "8px",
                                width: "420px",
                                minWidth: "360px",
                                flexWrap: "wrap",
                              }}
                            >
                              <Avatar
                                style={{
                                  backgroundColor: "#ffffff",
                                  marginRight: "8px",
                                  width: 40,
                                  height: 40,
                                }}
                                src="./icons/icon_printDoc.png"
                              />
                              <span
                                style={{
                                  flex: 1,
                                  color: theme["colorTextBase"],
                                }}
                              >
                                <b>Generate/Print out</b> a single hard copy of
                                the <b>Issue New Work Order Document.</b>{" "}
                              </span>
                            </div>
                          </Checkbox>
                        </div>
                      </Space>
                    </Checkbox.Group>
                  </Form.Item>
                </div>
              </Row>

              <Row gutter={16} style={{ textAlign: "right" }}>
                <Col span={24}>
                  <Form.Item>
                    <Button style={{ marginRight: 8 }} onClick={handleReset}>
                      Reset
                    </Button>
                    {/* <Button type="link" onClick={handleClearWorkOrderInfo}>
                      Clear Work Order Information
                    </Button> */}
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompleteWorkOrder;
