import { ProForm, ProFormText } from "@ant-design/pro-form";
import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Space,
} from "antd";

import { useState } from "react";
import "./MyForm.css";

import light from "../../src/tokens/light.json";

interface FormFields {
  name?: string;
  userId?: string;
  address?: string;
  nickname?: string;
  sendEmail?: boolean;
  sendSms?: boolean;
  favColors?: string[];
  phoneNumber?: string;
  website?: string;
  favoriteColor?: string;
  postcode?: number;
}

const MyForm: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
  };

  const handleSubmit = (values: FormFields) => {
    console.log("Form values:", values);
  };

  const renderFormFields = () => {
    // Render form fields based on the selected item
    switch (selectedItem) {
      case "newWaterSupply":
        return (
          <>
            <ProForm.Group
              style={{
                marginTop: 12,
                marginLeft: 44,
                minWidth: "330px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "4px" }}>Name</label>
                <ProFormText
                  fieldProps={{
                    style: {
                      width: "20vh", // Set the width to 300px
                      minWidth: "300px", // Ensure a minimum width of 300px
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                  name="name"
                  placeholder="Full Name as shown in ID"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ marginBottom: 8 }}>Address</label>
                <Form.Item style={{ marginBottom: 8 }} name="address">
                  <Input
                    placeholder="House No./Apt Name, Block No."
                    style={{ width: "20vh", marginBottom: 8 }}
                  />
                  <Input
                    placeholder="Street No. / Name"
                    style={{ marginBottom: 8 }}
                  />
                  <Input
                    placeholder="Location, Area"
                    style={{ marginBottom: 8 }}
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
                        }, // Disable adjustment of the number in the input field
                      }}
                      rules={[
                        {
                          pattern: /^\d+$/, // Use a regular expression pattern to enforce numeric input
                          message: "🔢 numbers only ya... ",
                        },
                      ]}
                      width="xl"
                      name="postcode"
                      label="Postcode"
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
                      label="City"
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
                      label="State"
                      placeholder="State"
                    />
                  </div>
                </Form.Item>
              </div>
            </ProForm.Group>

            <Form.Item label="User ID" name="userId">
              <Input />
              <Input />
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
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

  return (
    <ConfigProvider theme={{ token: light }}>
      <Space direction="vertical" className="font-Mulish space-wrapper">
        <Space>
          <Button
            style={{
              margin: "10px 10px",
              display: "flex", // Use flex display
              justifyContent: "center",
              flexDirection: "column", // Arrange children vertically
              alignItems: "center",
              width: "auto", // Allow the button to adjust its width based on content
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
              display: "flex", // Use flex display
              justifyContent: "center",
              flexDirection: "column", // Arrange children vertically
              alignItems: "center",
              width: "auto", // Allow the button to adjust its width based on content
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
              display: "flex", // Use flex display
              justifyContent: "center",
              flexDirection: "column", // Arrange children vertically
              alignItems: "center",
              width: "auto", // Allow the button to adjust its width based on content
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
              display: "flex", // Use flex display
              justifyContent: "center",
              flexDirection: "column", // Arrange children vertically
              alignItems: "center",
              width: "auto", // Allow the button to adjust its width based on content
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
        </Space>
        <Form onFinish={handleSubmit}>
          {renderFormFields()}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </ConfigProvider>
  );
};

export default MyForm;
