import { GoldOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
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
    <PageContainer
      fixedHeader
      style={{
        width: "120%",
        top: 20,
        left: -10,
        zIndex: 5,
        backgroundColor: "transparent",
      }}
      header={{
        title: (
          <>
            <span className="font-play-header" style={{ marginRight: "8px" }}>
              Water Work Order Management{" "}
            </span>
            {/* Replace the Tag component with a customized Switch */}

            <br />
            <span
              className="font-play-header02"
              style={{
                background: theme["colorPrimaryBg"],
                padding: "4px 16px",
                borderRadius: "8px",
              }}
            >
              {actionLabel} • {selectedWorkOrderType}
            </span>
          </>
        ),
        breadcrumb: {
          items: [
            {
              path: "",
              title: (
                <>
                  <GoldOutlined
                    style={{
                      color: "#666666",
                      paddingLeft: "8px",
                    }}
                  />
                  <span
                    style={{
                      color: "#666666",
                      paddingLeft: "0px",
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    Dashboard{" "}
                  </span>
                </>
              ),

              className: "breadcrumb-item",
            },
            {
              path: "",
              title: (
                <span
                  style={{
                    color: "#666666",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  {" "}
                  breadcrumb 00{" "}
                </span>
              ),
              className: "breadcrumb-item",
            },
            {
              path: "",
              title: (
                <span
                  style={{
                    color: "#666666",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  {" "}
                  breadcrumb 01{" "}
                </span>
              ),
              className: "breadcrumb-item",
            },
            {
              path: "",
              title: (
                <span
                  style={{
                    color: "#666666",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  {" "}
                  breadcrumb 02{" "}
                </span>
              ),
              className: "breadcrumb-item",
            },
          ],
        },
      }}
      avatar={{
        style: {
          backgroundColor: "#00a991",
          width: "48px",
          height: "47px",
          paddingLeft: "11px",
          paddingTop: "1px",
          paddingBottom: "4px",
          paddingRight: "1px",
        },
        src: "./icons/icon_WorkOrderManagement.png",
        alt: "Work Order Management Icon",
      }}
      extraContent={[]}
    >
      <div
        style={{
          // background: theme["colorPrimaryBg"],
          background: "rgba(248, 251, 248,0.08)",
          borderRadius: "8px",
          borderColor: "#fafafa",
          display: "flex",
          flexDirection: "row",
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
    </PageContainer>
  );
};

export default WaterWorkOrderMeterChange;
