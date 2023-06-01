import { FooterToolbar } from "@ant-design/pro-components";
import { ProForm, ProFormItem, ProFormText } from "@ant-design/pro-form";
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

import light from "../tokens/light.json";

interface FormFields {
  name?: string;
  idNumber?: number;
  address?: string;
  nickname?: string;
  sendEmail?: boolean;
  sendSms?: boolean;
  favColors?: string[];
  mobileNumber?: number;
  website?: string;
  favoriteColor?: string;
  postcode?: number;
}

const { Option } = Select;

const MyForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("MyKad");
  const [selectedItem, setSelectedItem] = useState("newWaterSupply");
  const [idNumber, setIdNumber] = useState("");
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

  const formatIdNumber = (value: string) => {
    const digitsOnly = value.replace(/[-\D]/g, "");
    const formattedValue = digitsOnly.slice(0, 6) + "-" + digitsOnly.slice(6);
    return formattedValue;
  };

  const handleIdNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedIdNumber = formatIdNumber(value);
    setIdNumber(formattedIdNumber);
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
                marginLeft: 64,
                minWidth: "330px",
              }}
            >
              <div>
                <ProFormText
                  fieldProps={{
                    style: {
                      width: "480px", //
                      minWidth: "400px", // Ensure a minimum width of 300px
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
                  <ProFormItem
                    label="ID"
                    tooltip="select relevant ID type"
                    name="idNumberType"
                  >
                    <Input
                      style={{
                        width: "100%", // adjust the width according to your layout
                      }}
                      addonBefore={selectBefore}
                      placeholder="12-digit number on ID Card"
                      maxLength={14} // Increased maxLength to accommodate dashes
                      pattern="^[0-9-]*$" // Updated pattern to allow dashes as well
                      title="ID number must contain only digits"
                      onKeyDown={(event) => {
                        const key = event.key;
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                        ];
                        const input = event.target as HTMLInputElement;
                        const selectionStart = input.selectionStart || 0;
                        const selectionEnd = input.selectionEnd || 0;
                        const value = input.value;

                        if (
                          !/^\d*$/.test(key) && // Check if the key is a digit
                          !allowedKeys.includes(key) && // Check if the key is allowed (e.g., Backspace, Delete, Arrow keys)
                          !(key === "Control" && navigator.platform.match("Mac")
                            ? event.metaKey
                            : event.ctrlKey) // Check if it's a control key combination (e.g., Ctrl+C, Ctrl+V)
                        ) {
                          event.preventDefault();
                        }

                        // Automatically format the input by adding dashes
                        if (!allowedKeys.includes(key)) {
                          let formattedValue = value;
                          if (selectionStart === selectionEnd) {
                            if (selectionStart === 6 || selectionStart === 9) {
                              formattedValue += "-";
                            }
                          } else {
                            formattedValue =
                              value.slice(0, selectionStart) +
                              "-" +
                              value.slice(selectionStart, selectionEnd) +
                              value.slice(selectionEnd);
                          }
                          input.value = formattedValue;
                        }
                      }}
                    />
                  </ProFormItem>
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
                        width: "480px", //
                        minWidth: "400px", // Ensure a minimum width of 300px
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                    name="house-apt-number"
                    placeholder="House No. / Apt No. , Apt Name, Block"
                    style={{ marginBottom: 12 }}
                  />
                  <ProFormText
                    fieldProps={{
                      style: {
                        width: "480px", //
                        minWidth: "400px", // Ensure a minimum width of 300px
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                    label=":- Street"
                    name="street-number-name"
                    placeholder="Street No. , Name"
                    style={{ marginBottom: 12 }}
                  />
                  <ProFormText
                    fieldProps={{
                      style: {
                        width: "480px", //
                        minWidth: "400px", // Ensure a minimum width of 300px
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                    label=":- Venue"
                    name="location-area"
                    placeholder="Location, Area"
                    style={{ marginBottom: 12 }}
                  />

                  <div style={{ display: "flex", gap: 8 }}>
                    <ProFormText
                      fieldProps={{
                        style: {
                          width: "140px",
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
                      width="md"
                      name="postcode"
                      label=":- Postcode"
                      placeholder="Postcode"
                    />
                    <ProFormText
                      fieldProps={{
                        style: {
                          width: "160px",
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
                          width: "160px",
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

            <>
              <div>
                <Form.Item>
                  <Checkbox.Group>
                    <Space direction="horizontal">
                      <div
                        style={{
                          width: "480px",
                          minWidth: "400px",
                          padding: 10,
                          marginLeft: 64,
                          background: sendViaEmailSMS
                            ? light["cyan.3"]
                            : "#fff",
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
                              flexWrap: "wrap",
                            }}
                          >
                            <Avatar
                              style={{
                                backgroundColor: "#fff",
                                marginRight: "8px",

                                width: 40,
                                height: 40,
                              }}
                              src="./icons/icon_sendDoc.png"
                            />
                            <span style={{ flex: 1 }}>
                              <b>Send</b> Forms, Checklists, Instructions, and a
                              Plumber Resource List to Applicant Via{" "}
                              <b>SMS & Email.</b>
                            </span>
                          </div>
                        </Checkbox>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "8px",
                          width: "480px",
                          minWidth: "400px",
                          flexWrap: "wrap",
                          padding: 10,
                          marginLeft: 22,
                          background: printForm ? light["cyan.3"] : "#fff",
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
                                backgroundColor: "#fff",
                                marginRight: "8px",
                                width: 40,
                                height: 40,
                              }}
                              src="./icons/icon_printDoc.png"
                            />
                            <span style={{ flex: 1 }}>
                              <b>Print out</b> Forms, Checklists, Instructions,
                              and a Plumber Resource List as <b>Hard Copies</b>{" "}
                              for the Applicant.
                            </span>
                          </div>
                        </Checkbox>
                      </div>
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </>
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
          : selectedOption === "MyKAS"
          ? "myKAS-select"
          : "forCommercial-select" // this is not for individual user (residential) but exclusively for commercial, having this option here is just to remind the color coding in .css
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
      <Option value="Commercial" className="forCommercial-option">
        Commercial
      </Option>
    </Select>
  );

  return (
    <ConfigProvider theme={{ token: light }}>
      <Space direction="vertical" className="font-Mulish space-wrapper">
        <Space>
          <span></span>

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
        <ProForm
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={handleSubmit}
        >
          {renderFormFields()}
        </ProForm>
      </Space>
    </ConfigProvider>
  );
};

export default MyForm;
