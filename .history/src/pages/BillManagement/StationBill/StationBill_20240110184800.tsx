import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
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
import React,{ useEffect,useState } from "react";
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
  eventGroup?: string;
  taxCode?: string;
  taxRate?: number;
  eventItem?: string;
  itemQuantity?: number | undefined;
  itemChargeRate?: number;
  itemAmount?: number;
  governmentServiceChargeRate?: string;
  governmentServiceChargeAmount?: string;
  children?: DataSourceType[];
}

const mockData: DataSourceType[] = [
  {
    id: 446888504,
    eventGroup: "eventGroup01",
    taxCode: "TC001",
    taxRate: 10,
    eventItem: "01 - Bil A",
    itemQuantity: 5,
    itemChargeRate: 20.1,
    itemAmount: 5 * 20.1,
    governmentServiceChargeRate: "5",
    governmentServiceChargeAmount: "5",
  },
  {
    id: 444738504,
    eventGroup: "eventGroup02",
    taxCode: "TC002",
    taxRate: 8,
    eventItem: "02 - Bill B",
    itemQuantity: 3,
    itemChargeRate: 15.0,
    itemAmount: 3 * 15.0,
    governmentServiceChargeRate: "3",
    governmentServiceChargeAmount: "1.35",
  },
  // Add more mock data as needed
];

mockData.forEach((item) => {
  const quantity =
    typeof item.itemQuantity === "number"
      ? item.itemQuantity
      : parseFloat(item.itemQuantity || "");
  const chargeRate =
    typeof item.itemChargeRate === "number"
      ? item.itemChargeRate
      : parseFloat(item.itemChargeRate || "");

  // Calculate government service charge amount
  const governmentServiceChargeRate = parseFloat(
    item.governmentServiceChargeRate || "0"
  );
  item.governmentServiceChargeAmount = (
    (governmentServiceChargeRate / 100) *
    (item.itemAmount || 0)
  ).toFixed(2);

  if (!isNaN(quantity) && !isNaN(chargeRate)) {
    item.itemAmount = quantity * chargeRate;
  } else {
    // Handle the case where itemQuantity or itemChargeRate is not a number
    // You can set a default value or handle it based on your requirements
    item.itemAmount = NaN; // Or any other suitable default value
  }
});

const StationBill: React.FC<StationBillProps> = ({ theme }) => {
  const [workOrderType, setWorkOrderType] = useState("");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const ACCOUNT_NUMBER_MAX_LENGTH = 10;
  const initialPlaceholder = "•".repeat(ACCOUNT_NUMBER_MAX_LENGTH);

const [inputValue, setInputValue] = useState('•'.repeat(ACCOUNT_NUMBER_MAX_LENGTH));

const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let inputVal = e.target.value;
  // Remove non-digit characters
  inputVal = inputVal.replace(/\D/g, "");

  // Limit the length of inputVal
  if (inputVal.length > ACCOUNT_NUMBER_MAX_LENGTH) {
    inputVal = inputVal.substring(0, ACCOUNT_NUMBER_MAX_LENGTH);
  }

  // Replace the dots with the input value
  const updatedValue = inputVal.padEnd(ACCOUNT_NUMBER_MAX_LENGTH, "•");
  setInputValue(updatedValue);
  setAccountNumber(inputVal); // Store only the numeric part
};


  useEffect(() => {
    // Initialize with all dots
    setInputValue("•".repeat(ACCOUNT_NUMBER_MAX_LENGTH));
  }, []);

  const [form] = Form.useForm();
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");

  const validateAccountNumber = (accountNum: string) => {
    const isValid = /^[0-9]{10}$/.test(accountNum); // Example: 10-digit number validation
    if (!isValid) {
      message.error("Invalid account number. Please enter a 10-digit number.");
    }
    return isValid;
  };

  const getAccountInfoStyle = () => ({
    backgroundColor: accountNumber
      ? theme["colorPrimary"]
      : theme["colorDisabled"],
    color: accountNumber ? "#fafafa" : "#ccc",
  });

  const handleSaveBillEvent = async (
    rowKey: React.Key[],
    data: DataSourceType,
    row: DataSourceType
  ) => {
    try {
      // Logic to save bill event
      await waitTime(2000);
      console.log(rowKey, data, row);
    } catch (error) {
      message.error("Error saving bill event. Please try again.");
    }
  };

  // Define columns for EditableProTable
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      valueType: "indexBorder",
      width: "20",
    },
    {
      title: "Event Group",
      key: "eventGroup",
      dataIndex: "eventGroup",
      valueType: "select",
      valueEnum: {
        all: { text: "Please select an event group", status: "Default" },
        eventGroup01: {
          text: "eventGroup01",
          status: "Success",
        },
        eventGroup02: {
          text: "eventGroup02",
          status: "Success",
        },
        eventGroup03: {
          text: "eventGroup03",
          status: "Success",
        },
      },
    },
    {
      title: "Tax Code",
      dataIndex: "taxCode",
      readonly: true,
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>{record.taxCode}</span>
      ),
    },
    {
      title: "Tax Rate (%)",
      dataIndex: "taxRate",
      readonly: true,
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>
          {record.taxRate !== undefined
            ? (typeof record.taxRate === "number"
                ? record.taxRate.toFixed(2)
                : parseFloat(record.taxRate).toFixed(2)) + " %"
            : ""}
        </span>
      ),
    },

    {
      title: "Event Item",
      key: "eventItem",
      dataIndex: "eventItem",
      valueType: "select",
      valueEnum: {
        all: { text: "Please select an event group", status: "Default" },
        eventItem01: {
          text: "01 - Bill A",
          status: "Default",
        },
        eventItem02: {
          text: "02 - Bill B",
          // status: "Default",
        },
        eventItem03: {
          text: "03 - Bill C",
          // status: "Default",
        },
      },
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>{record.eventItem}</span>
      ),
    },

    {
      title: "Item Quantity",
      key: "itemQuantity",
      dataIndex: "itemQuantity",
      valueType: "digit",
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>{record.itemQuantity}</span>
      ),
    },
    {
      title: "Item Charge Rate (RM)",
      key: "itemChargeRate",
      dataIndex: "itemChargeRate",
      valueType: (item) => ({
        type: "money",
        locale: "ms-MY",
        // step: 0.01,
        // precision: 3,
      }),
      fieldProps: (form, config) => {
        return {
          style: { width: "auto" },
          step: 0.01,
          precision: 2,
          // formatter: (value) => `RM ${Number(value).toFixed(2)}`,
          // parser: (value) => value.replace(/^RM\s?/, "").replace(/,/g, ""),
          // onBlur: (e) => {
          //   let value = e.target.value;
          //   value = value.replace(/^RM\s?/, "").replace(/,/g, ""); // Remove RM and commas
          //   e.target.value = Number(value).toFixed(2); // Format with 2 decimal places
          // },
          rules: [
            { required: true, message: "This field is mandatory!" },
            {
              validator: (_: any, value: any) =>
                value === 0 || value === "0"
                  ? Promise.reject(new Error("Value cannot be zero"))
                  : Promise.resolve(),
              message: "Value cannot be zero",
            },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message:
                "Only numerical values with up to two decimals are allowed",
            },
          ],
        };
      },
      render: (text, record) => {
        const formattedChargeRate = (record.itemChargeRate || 0).toFixed(2);
        return (
          <span
            style={{ color: theme.colorText }}
          >{`RM ${formattedChargeRate}`}</span>
        );
      },
    },
    {
      title: "Item Amount (RM)",
      key: "itemAmount",
      dataIndex: "itemAmount",
      valueType: (item) => ({
        type: "money",
        locale: "ms-MY",
        // step: 0.01,
        // precision: 3,
      }),
      render: (text, record) => {
        // Ensure itemQuantity is a valid number
        const itemQuantity =
          typeof record.itemQuantity === "number"
            ? record.itemQuantity.toString()
            : typeof record.itemQuantity === "string"
            ? record.itemQuantity
            : "";

        // Parse itemChargeRate as a string, or default to an empty string if undefined or not a valid number
        const itemChargeRate =
          typeof record.itemChargeRate === "number"
            ? record.itemChargeRate.toString()
            : typeof record.itemChargeRate === "string"
            ? record.itemChargeRate
            : "";

        // Calculate itemAmount as itemQuantity * itemChargeRate (as a string) and format it with 2 decimal places
        const itemAmount = (
          parseFloat(itemQuantity) * parseFloat(itemChargeRate)
        ).toFixed(2);

        return (
          <span style={{ color: theme.colorText }}>
            {`RM ${itemAmount}`}{" "}
            {/* Ensure itemAmount is displayed as a string with 2 decimal places */}
          </span>
        );
      },
      readonly: true,
    },

    {
      title: "Government Service Charge (%)",
      key: "governmentServiceChargeRate",
      dataIndex: "governmentServiceChargeRate",
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>
          {record.governmentServiceChargeRate} %
        </span>
      ),
    },
    {
      title: "Government Service Charge Amount (RM)",
      key: "governmentServiceChargeAmount",
      dataIndex: "governmentServiceChargeAmount",
      render: (text, record) => (
        <span style={{ color: theme.colorText }}>
          RM {record.governmentServiceChargeAmount}
        </span>
      ),
    },
    {
      title: (
        <div
          style={{
            fontWeight: "bold",
            height: "120%",
            width: "auto",
            overflow: "hidden",
            background: "rgba(92, 110, 113, 0.05)", // Semi-transparent overlay color for the blur effect
            zIndex: 1,
            borderRadius: "4px",
            padding: "16px 16px",
            right: 0,
            top: 0,
            left: 0,
            margin: "-12 -8 -12 -8", // Ensure the overlay is behind the content
            backdropFilter: "blur(px)", // Use backdrop-filter for modern browsers that support it
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
            &nbsp;&nbsp;Edit &nbsp;&nbsp;
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
            <a key="delete">&nbsp;Delete &nbsp;&nbsp;&nbsp;</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setDataSource(mockData);
  }, []);

  const handleDelete = (id: React.Key) => {
    setDataSource((prevData) => prevData.filter((item) => item.id !== id));
    message.success("Entry deleted successfully!");
  };

  const handleSave = async (
    rowKey: React.Key,
    data: DataSourceType,
    row: DataSourceType
  ) => {
    // Find the index of the edited record in the dataSource
    const recordIndex = dataSource.findIndex((item) => item.id === rowKey);

    if (recordIndex > -1) {
      // Update the dataSource with the new data
      const updatedDataSource = [...dataSource];
      updatedDataSource[recordIndex] = { ...data };

      setDataSource(updatedDataSource);
    }

    await waitTime(2000);
    console.log(rowKey, data, row);
  };

  const handleCancel = async (rowKey: React.Key, data: DataSourceType) => {
    console.log(rowKey, data);
  };

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

  // Determine whether "Account Information" should be full width
  const isAccountInfoFullWidth = window.innerWidth < 550;
  // Calculate Total Bill Amount
  const totalBillAmount = dataSource.reduce(
    (acc, item) => acc + (item.itemAmount || 0),
    0
  );

  // Calculate Total Tax Amount
  const totalTaxAmount = dataSource.reduce((acc, item) => {
    if (item.taxRate !== undefined) {
      return acc + (totalBillAmount * (item.taxRate / 100) || 0);
    }
    return acc;
  }, 0);

  // Calculate Total Government Service Charge Amount
  const totalGovernmentServiceChargeAmount = dataSource.reduce((acc, item) => {
    const governmentServiceChargeAmount = parseFloat(
      item.governmentServiceChargeAmount || "0"
    );
    return acc + governmentServiceChargeAmount;
  }, 0);

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
                value={inputValue}
                onChange={handleAccountNumberChange}
                placeholder={initialPlaceholder}
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
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            paddingLeft: 16,
            marginTop: 16,
          }}
        >
          <Col
            style={{
              flex: isAccountInfoFullWidth ? "1" : "0 0 auto",
              paddingRight: "16px",
              minWidth: isAccountInfoFullWidth ? "100%" : "30%", // Minimum width for "Account Information"
            }}
          >
            <div>
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
            </div>
          </Col>

          <Col
            style={{
              flex: "1",
              paddingRight: "16px",
              width: "70%", // Initial width for "Station Bill List"
              minWidth: "550px", // Minimum width for "Station Bill List"
            }}
          >
            <h2>Station Bill List</h2>
            <EditableProTable<DataSourceType>
              rowKey="id"
              options={{ setting: true }}
              scroll={{ x: "max-content" }}
              search={false}
              footer={() => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px",
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <div>
                      <strong>Total Government Service Charge Amount:</strong>
                    </div>
                    <div>
                      <strong>Total Tax Amount:</strong>
                    </div>
                    <div>
                      <strong>Total Bill Amount (after tax):</strong>
                    </div>
                  </div>
                  <div style={{ width: "150px", textAlign: "right" }}>
                    <div>
                      RM {totalGovernmentServiceChargeAmount.toFixed(2)}
                    </div>
                    <div>RM {totalTaxAmount.toFixed(2)}</div>
                    <div>RM {totalBillAmount.toFixed(2)}</div>
                  </div>
                </div>
              )}
              headerTitle={
                <span
                  style={{
                    fontFamily: theme.fontFamily,
                  }}
                >
                  Station Bill List
                </span>
              }
              dataSource={dataSource}
              maxLength={5}
              recordCreatorProps={
                position !== "hidden"
                  ? {
                      position: "bottom",
                      record: { id: (Math.random() * 1000000).toFixed(0) },
                    }
                  : false
              }
              columns={columns}
              dateFormatter="string"
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: "multiple",
                editableKeys,
                onChange: setEditableRowKeys,
                actionRender: (row, config, dom) => [dom.save, dom.cancel],
                onSave: async (rowKey, data, row) => {
                  await waitTime(2000);
                  console.log(rowKey, data, row);
                },
                onCancel: async (rowKey, data) => {
                  console.log(rowKey, data);
                },
                onDelete: async (rowKey, data) => {
                  console.log(rowKey, data);
                },
              }}
            />

            {/* Start of Total Summary Section
            <div
              style={{
                marginTop: 16,
                marginLeft: 16,
                marginRight: 16,
                padding: "10px", // Add some padding inside the border
                border: "1px solid #38a890", // Change as per your color preference
                backgroundColor: theme["colorBgContainer"], // Change as per your color preference
                borderRadius: "4px", // Optional: for rounded corners
              }}
            >
              {" "}
              <h3>Total Summary Amount</h3>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Total Government Service Charge Amount">
                    <Input
                      disabled
                      value={`RM ${totalGovernmentServiceChargeAmount.toFixed(
                        2
                      )}`}
                      style={{ fontWeight: "bold" }} // Make font bold
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Tax Amount">
                    <Input
                      disabled
                      value={`RM ${totalTaxAmount.toFixed(2)}`}
                      style={{ fontWeight: "bold" }} // Make font bold
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {" "}
                  <Form.Item label="Total Bill Amount (after Tax)">
                    <Input
                      disabled
                      value={`RM ${totalBillAmount.toFixed(2)}`}
                      style={{
                        background: theme["cyan.2"],
                        fontWeight: "bold",
                      }} // Make font bold
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div> */}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StationBill;
