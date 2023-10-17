import React, { useState } from "react";
import "../../../App.css";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";

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

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
    // Perform any other actions or state management specific to this component if needed
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
              zIndex: 2,
              backgroundColor: "transparent",
            }}
            header={{
              title: (
                <>
                  <span
                    className="font-play-header"
                    style={{ marginRight: "8px" }}
                  >
                    NEW APPLICATION SYSTEM
                  </span>
                  {/* Replace the Tag component with a customized Switch */}
                  <Switch
                    style={{
                      height: "auto",
                      padding: " 1px 10px 1px 4px",
                      margin: "0px 8px 8px 8px",
                      fontFamily: "",
                      fontWeight: "bold",
                      backgroundColor: isResidential
                        ? light["green"]
                        : light["orange"], // Increase the font size here
                    }}
                    checkedChildren={
                      <span style={{ fontSize: "52px" }}>Residential</span>
                    }
                    unCheckedChildren={
                      <span style={{ fontSize: "52px" }}>Commercial</span>
                    }
                    checked={isResidential}
                    onChange={handleSwitchChange}
                  />

                  <br />
                  <span
                    className="font-play-header02"
                    style={{
                      background: token["colorPrimaryBg"],
                      padding: "4px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    New Request • NEW WATER SUPPLY
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
                height: "48px",
                padding: "4px",
              },
              src: "./icons/icon_NewSupplyManagement.png",
              alt: "New Application System Icon",
            }}
            extraContent={[]}
          >
        <div
          className="font-play-header"
          style={{
            marginLeft: 8,
            color: theme["colorText"],
            fontFamily: "Play",
            marginTop: -20,
          }}
        >
          WATER WORK ORDER MANAGEMENT - "sync with work order type's selection"
        </div>
      </h1>
      <span
        className="font-play-header02"
        style={{
          background: "#d1e8e1",
          padding: "4px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
          marginLeft: 56,
          marginTop: -20,
        }}
      >
        Issue New Work Order • NEW WATER SUPPLY
      </span>

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

      {selectedItem === "issueNewWorkOrder" && <IssueWorkOrder theme={theme} />}
      {selectedItem === "completeWorkOrder" && (
        <CompleteWorkOrder theme={theme} />
      )}
      {selectedItem === "cancelWorkOrder" && <CancelWorkOrder theme={theme} />}
      {/* Add the rest of your component content */}
    </div>
 </PageContainer>
  );
};

export default WaterWorkOrderMeterChange;
