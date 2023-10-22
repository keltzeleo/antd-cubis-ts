import React, { useState } from "react";
import "../../App.css";

interface Theme {
  [key: string]: string;
}

interface StationBillProps {
  theme: Theme;
}

const StationBill: React.FC<StationBillProps> = ({ theme }) => {
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

export default StationBill;
