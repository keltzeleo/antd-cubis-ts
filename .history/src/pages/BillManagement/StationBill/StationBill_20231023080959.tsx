import { ExclamationCircleOutlined } from "@ant-design/icons";
import EditableProTable, { ProColumns } from "@ant-design/pro-table";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd";
import React, { useState } from "react";

import RealType from "../../../customComponents/RealTimeTextDisplay/RealType";

const { Option } = Select;
const { TextArea } = Input;

interface Theme {
  [key: string]: string;
}

interface StationBillProps {
  theme: Theme;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export interface DataSourceType {
  id: React.Key;
  eventGroup: string;
  taxCode: string;
  taxRate: string;
  eventItem: string;
  eventItemDescription: string;
  itemQuantity: string;
  itemChargeRate: string;
  itemAmount: string;
  governmentServiceChargeRate: string;
  governmentServiceChargeAmount: string;
  children?: DataSourceType[];
}

interface StationBillProps {
  theme: Theme;
}

const StationBill: React.FC<StationBillProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState("");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");

  // Define columns for EditableProTable
  const columns: ProColumns<{
    id: React.Key;

    eventGroup: string;
    taxCode: string;
    taxRate: string;
    eventItem: string;
    eventItemDescription: string;
    itemQuantity: string;
    itemChargeRate: string;
    itemAmount: string;
    governmentServiceChargeRate: string;
    governmentServiceChargeAmount: string;
  }>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
      width: "20",
    },
    {
      title: "Event Group",
      dataIndex: "eventGroup",
    },
    {
      title: "Tax Code",
      dataIndex: "taxCode",
    },
    {
      title: "Tax Rate %",
      dataIndex: "taxRate",
    },
    {
      title: "Event Item",
      dataIndex: "eventItem",
    },
    {
      title: "Event Item Description",
      dataIndex: "eventItemDescription",
    },
    {
      title: "Item Quantity",
      dataIndex: "itemQuantity",
      render: (text, record) => {
        return (
          <Form.Item
            name={["itemQuantity", record.id]} // Use a unique key for each item
            initialValue={text}
          >
            <Input />
          </Form.Item>
        );
      },
    },
    {
      title: "Item Charge Rate",
      dataIndex: "itemChargeRate",
    },
    {
      title: "Item Amount",
      dataIndex: "itemAmount",
    },
    {
      title: "Government Service Charge %",
      dataIndex: "governmentServiceChargeRate",
    },
    {
      title: "Government Service Charge Amount",
      dataIndex: "governmentServiceChargeAmount",
    },
    {
      title: (
        <div
          style={{
            fontWeight: "bold",
            height: "120%",
            width: "auto",
            overflow: "hidden",
            background: "rgba(92, 110, 113, 0.1)", // Semi-transparent overlay color for the blur effect
            zIndex: 1,
            borderRadius: "4px",
            padding: "16px 16px",
            right: 0,
            top: 0,
            left: 0,
            margin: "-12 -8 -12 -8", // Ensure the overlay is behind the content
            backdropFilter: "blur(14px)", // Use backdrop-filter for modern browsers that support it
          }}
        >
          &nbsp; Actions &nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </div>
      ),
      valueType: "option",
      fixed: "right",
      width: "138",
      render: (text: any, record: DataSourceType, _, action) => (
        <span>
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            &nbsp;&nbsp;编辑 &nbsp;&nbsp;
          </a>

          <Popconfirm
            title="Are you sure you want to delete this entry?"
            onConfirm={() => {
              handleDelete(record.id);
            }}
            onCancel={() => message.info("Delete canceled")}
            okText="Yes"
            cancelText="No"
          >
            <a key="delete">&nbsp;删除 &nbsp;&nbsp;&nbsp;</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleDelete = (id: React.Key) => {
    setDataSource((prevData) => prevData.filter((item) => item.id !== id));
    message.success("Entry deleted successfully!");
  };

  const handleSave = async (
    rowKey: React.Key,
    data: DataSourceType,
    row: DataSourceType
  ) => {
    await waitTime(2000);
    console.log(rowKey, data, row);
  };

  const handleCancel = async (rowKey: React.Key, data: DataSourceType) => {
    console.log(rowKey, data);
  };

  const mockData: DataSourceType[] = [
    {
      id: 446738504,
      eventGroup: "Group 1",
      taxCode: "TC001",
      taxRate: "10%",
      eventItem: "Item 1",
      eventItemDescription: "Description 1",
      itemQuantity: "5",
      itemChargeRate: "$20",
      itemAmount: "$100",
      governmentServiceChargeRate: "5%",
      governmentServiceChargeAmount: "$5",
    },
    {
      id: 444738504,
      eventGroup: "Group 2",
      taxCode: "TC002",
      taxRate: "8%",
      eventItem: "Item 2",
      eventItemDescription: "Description 2",
      itemQuantity: "3",
      itemChargeRate: "$15",
      itemAmount: "$45",
      governmentServiceChargeRate: "3%",
      governmentServiceChargeAmount: "$1.35",
    },
    // Add more mock data as needed
  ];

  const handleFormChange = (changedValues: any, allValues: any) => {
    // Handle changes in form values here
    // You may update your state with the new values
  };

  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form values:", values);
    // Add logic to apply the filter and fetch data here
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
          fontFamily: "Book Antique",
          fontWeight: "bold",
        }}
      >
        Station Bill
      </h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Filtering Entry */}
        {/* Work Order Type */}
        <h2>Filtering Entry</h2>
        <Row gutter={16}>
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
        {/* Customer Information (Left) and Function Tabs (Right) */}
        <Row gutter={16} style={{ paddingLeft: 16, marginTop: 16 }}>
          <Col style={{ width: 420 }}>
            {/* Account Information */}
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
                    <Form.Item label="Branch">
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
                        Branch 01
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
                    <Form.Item label="D.O.B">
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
                        22/02/2000
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
                    <Form.Item label="Current Deposit">
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
                  <Col span={12}>
                    <Form.Item label="Last Deposit Revision">
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
                        [sample]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Deposit Type">
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
                        Type 01{" "}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Addtional Deposit">
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
                        [sample]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Current Arrears">
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
                        RM60.00
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="GST Relief">
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
                        [yes]
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col span={18} style={{ marginLeft: 16, alignContent: "center" }}>
            <h2>Bill Information</h2>
            <EditableProTable<DataSourceType>
              columns={columns}
              dataSource={mockData}
              options={{ setting: true }}
              scroll={{ x: "max-content" }}
              rowKey="id"
              search={false}
              dateFormatter="string"
              headerTitle={
                <span
                  style={{
                    fontFamily: theme.fontFamily,
                  }}
                >
                  Station Bill List
                </span>
              }
            />
          </Col>
        </Row>
        {/* Editable Pro Table */}
      </Form>
    </div>
  );
};

export default StationBill;
