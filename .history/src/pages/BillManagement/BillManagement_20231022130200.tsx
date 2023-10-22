import { GoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../../App.css";

interface Theme {
  [key: string]: string;
}

interface BillManagementProps {
  theme: Theme;
}

const BillManagement: React.FC<BillManagementProps> = ({ theme }) => {
  const [selectedItem, setSelectedItem] = useState("issueNewWorkOrder");
  const [actionLabel, setActionLabel] = useState("Issue New Work Order");

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
    const matchingButtonData = spotlightButtonData.find(
      (item) => item.scenario === value
    );
    if (matchingButtonData) {
      setActionLabel(matchingButtonData.label);
    }
  };

  const spotlightButtonData = [
    {
      scenario: "issueNewWorkOrder",
      iconSrc: "./icons/icon_IssueWorkOrder.png",
      label: "Issue New Work Order",
    },
    // Add more scenarios as needed
  ];

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          width: "120%",
          height: 132,
          marginLeft: -16,
          marginRight: -16,
          marginBottom: -16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12 16px",
          borderRadius: 8,
          backgroundColor: `${theme["backgroundColor"]}10`,
          backdropFilter: "blur(23px)",
          zIndex: 88,
        }}
      >
        <div className="header-container" style={{ marginLeft: 30 }}>
          <div
            className="breadcrumb-container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Breadcrumb */}
            <div className="breadcrumb-item">
              <GoldOutlined style={{ color: "#666666", paddingLeft: "8px" }} />
              <span
                style={{
                  color: "#666666",
                  paddingLeft: "8px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                Dashboard
              </span>
            </div>
            <div>
              <span
                style={{
                  // color: "#666666",
                  color: theme["colorText"],

                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                /
              </span>
            </div>
            <div className="breadcrumb-item">
              <span
                style={{
                  color: "#666666",

                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                breadcrumb 00
              </span>
            </div>
            <div>
              <span
                style={{
                  // color: "#666666",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                  color: theme["colorText"],
                }}
              >
                /
              </span>
            </div>
            <div className="breadcrumb-item">
              <span
                style={{
                  color: "#666666",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                breadcrumb 01
              </span>
            </div>
            <div>
              <span
                style={{
                  // color: "#666666",
                  color: theme["colorText"],

                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                /
              </span>
            </div>
            <div className="breadcrumb-item">
              <span
                style={{
                  color: "#666666",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: 14,
                }}
              >
                breadcrumb 02
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            {/* Avatar */}
            <div className="avatar-container">
              <img
                style={{
                  backgroundColor: "#00a991",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  paddingLeft: "4px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingRight: "0px",
                }}
                src="https://res.cloudinary.com/tyappreg/image/upload/v1697950874/icon_BillingManagement_t7fp7t.png"
                alt="Bill Management Icon"
              />
            </div>

            {/* Title */}
            <div className="title-container" style={{ marginLeft: "16px" }}>
              <span
                className="font-play-header"
                style={{
                  marginRight: "8px",
                  fontWeight: "bold",
                  color: theme["colorText"],
                }}
              >
                Bill Management
              </span>
              <br />
              <div style={{ height: 4 }}></div>
              <span
                className="font-play-header02"
                style={{
                  background: theme["colorPrimaryBg"],
                  padding: "1px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  top: 8,
                  color: theme["colorText"],
                }}
              >
                {actionLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 56 }}></div>
      <div
        style={{
          background: "rgba(248, 251, 248,0.08)",
          borderRadius: "8px",
          borderColor: "#fafafa",
          display: "flex",
          flexDirection: "row",
          marginTop: -16,
        }}
      ></div>
      {/* Rest of your component content */}
    </div>
  );
};

export default BillManagement;
