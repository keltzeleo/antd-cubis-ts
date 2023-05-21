import { ProForm, ProFormText } from "@ant-design/pro-form";
import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Select,
  Space,
} from "antd";

import { useState } from "react";
import "./MyForm.css";

import light from "../../src/tokens/light.json";

interface FormFields {
  name?: string;
  idNumber?: number;
  address?: string;
  nickname?: string;
  sendEmail?: boolean;
  sendSms?: boolean;
  favColors?: string[];
  phoneNumber?: number;
  website?: string;
  favoriteColor?: string;
  postcode?: number;
}

const { Option } = Select;

const MyForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("MyKad");
  const [selectedItem, setSelectedItem] = useState("newWaterSupply");
  const [sendViaEmailSMS, setSendViaEmailSMS] = useState(false);
  const [printForm, setPrintForm] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
    setPrintForm(false);
    setSendViaEmailSMS(false);
  };

  const handleEmailCheckboxChange = (checked: boolean) => {
    setSendViaEmailSMS(checked);
  };

  const handlePrintCheckboxChange = (checked: boolean) => {
    setPrintForm(checked);
  };

  const handleSubmit = (values: FormFields) => {
    return new Promise<void>((resolve, reject) => {
      console.log("Form values:", values);
      // You can perform any async operations here
      // Resolve the promise when the operations are complete
      resolve();
    });
  };

  const renderFormFields = () => {
    switch (selectedItem) {
      case "newWaterSupply":
        return (
          <>
            <ProForm.Group
              style={{
                marginTop: 16,
                marginLeft: 16,
                minWidth: "330px",
              }}
            >
              <div>
                <ProFormText
                  fieldProps={{
                    style: {
                      width: "30vh", //
                      minWidth: "300px", // Ensure a minimum width of 300px
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                  label="Name"
                  name="name"
                  tooltip="customer's legal name on ID"
                  placeholder="Full Name"
                />

                <div>
                  <Form.Item
                    label="ID"
                    name="idNumber"
                    tooltip="select relavant ID type"
                  >
                    <Input
                      style={{
                        width: "", // not setting any value for having the same width as "name"
                        minWidth: "", // not setting any value for having the same width as "name"
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      addonBefore={selectBefore}
                      placeholder="12-digit number on ID Card"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    tooltip="valid and contactable mobile number"
                  >
                    <Input
                      style={{
                        width: "", // not setting any value for having the same width as "name"
                        minWidth: "", // not setting any value for having the same width as "name"
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      addonBefore="+60"
                      placeholder="contactable number"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Email Address"
                    name="emailAdd"
                    tooltip="valid and contactable email address"
                  >
                    <Input
                      style={{
                        width: "", // not setting any value for having the same width as "name"
                        minWidth: "", // not setting any value for having the same width as "name"
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      placeholder="id@emailDomain.com"
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <Form.Item
                  style={{}}
                  label="Address:-"
                  name="fullAddress"
                  tooltip="fill in as per respective requirements."
                >
                  <ProFormText
                    fieldProps={{
                      style: {
                        width: "25vh", //
                        minWidth: "150px", // Ensure a minimum width of 300px
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                    name="house-apt-number"
                    placeholder="House No. / Apt No. , Apt Name, Block"
                    style={{ width: "20vh", marginBottom: 12 }}
                  />
                  <ProFormText
                    label=":- Street"
                    name="street-number-name"
                    placeholder="Street No. , Name"
                    style={{ marginBottom: 12 }}
                  />
                  <ProFormText
                    label=":- Venue"
                    name="location-area"
                    placeholder="Location, Area"
                    style={{ marginBottom: 12 }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <ProFormText
                      fieldProps={{
                        style: {
                          width: "10vh",
                          minWidth: "120px", // Adjust the maximum width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                      rules={[
                        {
                          pattern: /^\d+$/, // Use a regular expression pattern to enforce numeric input
                          message: "🔢 numbers only ya...",
                        },
                      ]}
                      width="xl"
                      name="postcode"
                      label=":- Postcode"
                      placeholder="Postcode"
                    />
                    <ProFormText
                      fieldProps={{
                        style: {
                          minWidth: "120px", // Adjust the maximum width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                      width="md"
                      name="city"
                      label=":- City"
                      placeholder="City"
                    />
                    <ProFormText
                      fieldProps={{
                        style: {
                          minWidth: "120px", // Adjust the maximum width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                      width="md"
                      name="state"
                      label=":- State"
                      placeholder="State"
                    />
                  </div>
                </Form.Item>
              </div>
            </ProForm.Group>
            <div>
              <Form.Item>
                <Checkbox.Group>
                  <Space direction="horizontal">
                    <div
                      style={{
                        maxWidth: "30vh",
                        padding: 8,
                        margin: 16,
                        background: sendViaEmailSMS ? light["cyan.2"] : "#fff",
                        border: "1px solid #e3e6e9",
                        borderRadius: 8,
                        transition: "background 0.3s ease-in-out",
                      }}
                    >
                      <Checkbox
                        value="sendViaEmail"
                        checked={sendViaEmailSMS}
                        onChange={(e) =>
                          handleEmailCheckboxChange(e.target.checked)
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "8px",
                            maxWidth: "30vh",
                            flexWrap: "wrap",
                          }}
                        >
                          <Avatar
                            src="./icons/SVG/viaMail.svg"
                            style={{
                              marginRight: "16px",
                              width: "40px",
                              height: "40px",
                            }}
                          />
                          <span style={{ flex: 1 }}>
                            <b>Send</b> Forms, Checklists, Instructions, Plumber
                            List to Applicant Via <b>SMS & Email.</b>
                          </span>
                        </div>
                      </Checkbox>
                    </div>
                    <div
                      style={{
                        maxWidth: "30vh",
                        padding: 8,
                        margin: 16,
                        background: printForm ? light["cyan.2"] : "#fff",
                        border: "1px solid #e3e6e9",
                        borderRadius: 8,
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
                            maxWidth: "30vh",
                            flexWrap: "wrap",
                          }}
                        >
                          <Avatar
                            src="./icons/SVG/printDoc.svg"
                            style={{ marginRight: "8px" }}
                          />
                          <span style={{ flex: 1 }}>
                            <b>Print out</b> Forms, Checklists, Instructions,
                            Plumber List to Applicant
                          </span>
                        </div>
                      </Checkbox>
                    </div>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </div>
            <>{/* Existing form fields */}</>
          </>
        );
      case "accountTransfer":
        return (
          <>
            <Form.Item label="Nickname" name="nickname">
              <Input />
            </Form.Item>
            <Form.Item>
              <Checkbox name="sendEmail">Send via Email</Checkbox>
            </Form.Item>
            <Form.Item>
              <Checkbox name="sendSms">Send via SMS</Checkbox>
            </Form.Item>
          </>
        );
      case "tempSup":
        return (
          <>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="User ID" name="userId">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Favorite Colors" name="favColors">
              <Checkbox.Group options={["Red", "Blue", "Green"]} />
            </Form.Item>
          </>
        );
      case "cof":
        return (
          <>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Website" name="website">
              <Input />
            </Form.Item>
            <Form.Item label="Favorite Color" name="favoriteColor">
              <Input />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  const selectBefore = (
    <Select
      value={selectedOption}
      onChange={handleOptionChange}
      className={
        selectedOption === "MyKad"
          ? "myKad-select"
          : selectedOption === "MyTentera"
          ? "myTentera-select"
          : selectedOption === "MyPR"
          ? "myPR-select"
          : "myKAS-select"
      }
    >
      <Option value="MyKad" className="myKad-option">
        MyKad
      </Option>
      <Option value="MyTentera" className="myTentera-option">
        MyTentera
      </Option>
      <Option value="MyPR" className="myPR-option">
        MyPR
      </Option>
      <Option value="MyKAS" className="myKAS-option">
        MyKAS
      </Option>
    </Select>
  );

  return (
    <ConfigProvider theme={{ token: light }}>
      <Space direction="vertical" className="font-Mulish space-wrapper">
        <Space>
          <span>New Request Type:- </span>
          <div
            style={{
              background: "#e3e6e9",
              margin: 8,
              display: "flex",
              borderRadius: "8px",
            }}
          >
            <Button
              style={{
                margin: "10px 10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                height: "auto",
              }}
              shape="default"
              icon={
                <Avatar
                  style={{
                    backgroundColor: "#fff",
                    marginTop: "2px",
                    marginBottom: "-4px",
                  }}
                  src="./icons/icon_IndividualApplication.png"
                />
              }
              type={selectedItem === "newWaterSupply" ? "primary" : "default"}
              onClick={() => handleButtonClick("newWaterSupply")}
              className={`segmented-button ${
                selectedItem === "newWaterSupply" ? "selected" : ""
              }`}
            >
              <div style={{ padding: "8px" }}>New Water Supply</div>
            </Button>
            <Button
              style={{
                margin: "10px 10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                height: "auto",
              }}
              shape="default"
              icon={
                <Avatar
                  style={{
                    backgroundColor: "#fff",
                    marginTop: "2px",
                    marginBottom: "-4px",
                  }}
                  src="./icons/icon_accountTransfer.png"
                />
              }
              type={selectedItem === "accountTransfer" ? "primary" : "default"}
              onClick={() => handleButtonClick("accountTransfer")}
              className={`segmented-button ${
                selectedItem === "accountTransfer" ? "selected" : ""
              }`}
            >
              <div>
                <div style={{ padding: "8px" }}>Account Transfer</div>
              </div>
            </Button>

            <Button
              style={{
                margin: "10px 10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                height: "auto",
              }}
              type={selectedItem === "tempSup" ? "primary" : "default"}
              onClick={() => handleButtonClick("tempSup")}
              className={`segmented-button ${
                selectedItem === "tempSup" ? "selected" : ""
              }`}
            >
              <div>
                <Avatar
                  style={{
                    backgroundColor: "#fff",
                    marginTop: "2px",
                    marginBottom: "-4px",
                  }}
                  src="./icons/icon_temporarySupply.png"
                />
                <div style={{ padding: "8px" }}>Temporary Supply</div>
              </div>
            </Button>
            <Button
              style={{
                margin: "10px 10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                height: "auto",
              }}
              type={selectedItem === "cof" ? "primary" : "default"}
              onClick={() => handleButtonClick("cof")}
              className={`segmented-button ${
                selectedItem === "cof" ? "selected" : ""
              }`}
            >
              <div className="avatar-wrapper">
                <Avatar
                  style={{ backgroundColor: "#fff" }}
                  src="./icons/icon_changeOfTenancy.png"
                />
                <div style={{ padding: "8px" }}>Change of Tenancy</div>
              </div>
            </Button>
          </div>
        </Space>
        <ProForm onFinish={handleSubmit}>
          {renderFormFields()}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </ProForm>
      </Space>
    </ConfigProvider>
  );
};

export default MyForm;
