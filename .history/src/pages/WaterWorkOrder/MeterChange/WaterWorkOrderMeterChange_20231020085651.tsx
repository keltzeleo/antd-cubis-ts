import { GoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../../../App.css";

import SpotlightButton from "../../../customComponents/SpotLightButton/SpotLightButton";
import CancelWorkOrder from "../../WaterWorkOrder/MeterChange/CancelWorkOrder";
import CompleteWorkOrder from "../../WaterWorkOrder/MeterChange/CompleteWorkOrder";
import IssueWorkOrder from "../../WaterWorkOrder/MeterChange/IssueWorkOrder";
interface Theme {
  [key: string]: string;
}

interface WaterWorkOrderMeterChangeProps {
  theme: Theme;
}

const WaterWorkOrderMeterChange: React.FC<WaterWorkOrderMeterChangeProps> = ({
  theme,
}) => {
  const [selectedItem, setSelectedItem] = useState("issueNewWorkOrder");
  const [actionLabel, setActionLabel] = useState("Issue New Work Order"); // For the "New Request"
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState("");

  const handleSelectedWorkOrderChange = (value: string) => {
    setSelectedWorkOrderType(value.toUpperCase());
  };

  const handleClearSelectedWorkOrder = () => {
    setSelectedWorkOrderType("");
  };

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
    const matchingButtonData = spotlightButtonData.find(
      (item) => item.scenario === value
    );
    if (matchingButtonData) {
      setActionLabel(matchingButtonData.label);
    }
    // Clear out the selectedWorkOrderType when a new button is clicked
    setSelectedWorkOrderType("");
  };

  const spotlightButtonData = [
    {
      scenario: "issueNewWorkOrder",
      iconSrc: "./icons/icon_IssueWorkOrder.png",
      label: "Issue New Work Order",
    },
    {
      scenario: "completeWorkOrder",
      iconSrc: "./icons/icon_CompleteWorkOrder.png",
      label: "Complete Work Order",
    },
    {
      scenario: "cancelWorkOrder",
      iconSrc: "./icons/icon_CancelWorkOrder.png",
      label: "Cancel Work Order",
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
          backgroundColor: `${theme["backgroundColor"]}10`, // Apply transparency to the background color
          backdropFilter: "blur(13px)", // Apply the blur filter
          zIndex: 88,
        }}
      >
        <div className="header-container">
          {/* Breadcrumb */}
          <div
            className="breadcrumb-container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
                  paddingLeft: "8px",
                  paddingTop: "4px",
                  paddingBottom: "6px",
                  paddingRight: "0px",
                }}
                src="./icons/icon_WorkOrderManagement.png"
                alt="Work Order Management Icon"
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
                Water Work Order Management
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
                {actionLabel} • {selectedWorkOrderType}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 56 }}></div>
      <div
        style={{
          // background: theme["colorPrimaryBg"],
          background: "rgba(248, 251, 248,0.08)",
          borderRadius: "8px",
          borderColor: "#fafafa",
          display: "flex",
          flexDirection: "row",
          marginTop: -16,
        }}
      >
        <div
          style={{
            // background: "rgba(245, 250, 240,0.1)",
            margin: 16,
            display: "flex",
            borderRadius: "8px",
          }}
        >
          {spotlightButtonData.map(({ scenario, iconSrc, label }) => (
            <SpotlightButton
              key={scenario}
              scenario={scenario}
              iconSrc={iconSrc}
              label={label}
              isSelected={selectedItem === scenario}
              onClick={() => handleButtonClick(scenario)}
            />
          ))}
        </div>
      </div>
      {selectedItem === "issueNewWorkOrder" && (
        <IssueWorkOrder
          theme={theme}
          onClearSelectedWorkOrder={handleClearSelectedWorkOrder}
          onSelectedWorkOrderChange={handleSelectedWorkOrderChange}
        />
      )}
      {selectedItem === "completeWorkOrder" && (
        <CompleteWorkOrder
          theme={theme}
          onClearSelectedWorkOrder={handleClearSelectedWorkOrder}
          onSelectedWorkOrderChange={handleSelectedWorkOrderChange}
        />
      )}
      {selectedItem === "cancelWorkOrder" && (
        <CancelWorkOrder
          theme={theme}
          onClearSelectedWorkOrder={handleClearSelectedWorkOrder}
          onSelectedWorkOrderChange={handleSelectedWorkOrderChange}
        />
      )}{" "}
      {/* Add the rest of your component content */}
    </div>
  );
};

export default WaterWorkOrderMeterChange;
