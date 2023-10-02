import {
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import RealType from "../../../customComponents/RealTimeTextDisplay/RealType";
import WorkOrderTypeSelection from "../../../customComponents/Select/WorkOrderTypeSelection";
const { Option } = Select;

interface Theme {
  [key: string]: string;
}

interface CancelWorkOrderProps {
  theme: Theme;
}

interface SelectOption {
  value: string;
  label: string | React.ReactNode;
}

const CancelWorkOrder: React.FC<CancelWorkOrderProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState("");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");
  const [cancelWorkOrderStatus, setCancelWorkOrderStatus] =
    useState<SelectOption | null>(null);

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
        Cancel Work Order
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
              label="Work Order Number"
              name="workOrderNumber"
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
                message="Work Order Number Required"
                description="Please enter a valid Work Order Number to proceed."
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
              <CloseCircleTwoTone
                style={{ fontSize: "20" }}
                twoToneColor={theme["red.4"]}
              />{" "}
              Cancel Wok Order
            </h2>
            <div
              style={{
                padding: " 16 16",
                borderRadius: 16,
                borderColor: theme["red.2"],
                // border: "1px dashed #fbbbc2",
                backgroundColor: theme["red.2"],
              }}
            >
              <Form.Item label="Work Order Cancellation ">
                <Select
                  labelInValue
                  placeholder="Please Select a Cancellation Reason"
                  onChange={(option: SelectOption) =>
                    setCancelWorkOrderStatus(option)
                  }
                >
                  <Option value="OptionValue1">Cancel Reason - 01</Option>
                  <Option value="OptionValue2">Cancel Reason - 02</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </div>
            <h2>CURRENT Meter Information</h2>
            <Table
              dataSource={[
                {
                  key: "1",
                  meterNo: "12345",
                  meterStatus: "Active",
                  lastControlReading: "5000",
                  lastActualReading: "5200",
                  lastReadCode: "A1",
                  replacedMeterConsumption: "100",
                  meterFaulty: true,
                },
                // Add more rows as needed
              ]}
              columns={[
                {
                  title: "Meter No",
                  dataIndex: "meterNo",
                  key: "meterNo",
                },
                {
                  title: "Meter Status",
                  dataIndex: "meterStatus",
                  key: "meterStatus",
                },
                {
                  title: "Last Control Reading",
                  dataIndex: "lastControlReading",
                  key: "lastControlReading",
                },
                {
                  title: "Last Actual Reading",
                  dataIndex: "lastActualReading",
                  key: "lastActualReading",
                },
                {
                  title: "Last Read Code",
                  dataIndex: "lastReadCode",
                  key: "lastReadCode",
                },
                {
                  title: "Replaced Meter Consumption",
                  dataIndex: "replacedMeterConsumption",
                  key: "replacedMeterConsumption",
                },
                {
                  title: "Meter Faulty",
                  dataIndex: "meterFaulty",
                  key: "meterFaulty",
                  render: (value) => (value ? "Yes" : "No"),
                },
              ]}
              pagination={false}
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
                        background: theme["red.4"],
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      <span>{cancelWorkOrderStatus?.label}</span>
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              {/* Input fields */}
              <Row gutter={16}>
                <Col span={8} style={{ width: "250px" }}>
                  <Form.Item
                    label="Schedule Start Date"
                    name="scheduleStartDate"
                  >
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
                      09/09/2023
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ width: "250px" }}>
                  <Form.Item label="Schedule End Date" name="scheduleEndDate">
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
                      20/09/2023
                    </span>
                  </Form.Item>
                </Col>
                <Col style={{ maxWidth: "220px" }}>
                  <Form.Item
                    label="Schedule Start Time"
                    name="scheduleStartTime"
                  >
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
                      10:50AM
                    </span>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Department In Charge"
                    name="departmentInCharge"
                  >
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
                      Department 01
                    </span>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Meter Remark" name="meterRemark">
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
                      [Water Remark]
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Assign To" name="assignTo">
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
                      Razak bin Osman
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Work Order Remark" name="workOrderRemark">
                    <Input style={{height:20px}}/>
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
                                the <b>Cancel Work Order Document.</b>{" "}
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

export default CancelWorkOrder;
