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
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="User ID" name="userId">
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
