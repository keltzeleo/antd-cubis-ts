import React, { useState } from "react";
import SpotlightButton from "../../../customComponents/SpotLightButton/SpotLightButton";
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
  const [selectedItem, setSelectedItem] = useState("");

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
    <div style={{ marginLeft: 24 }}>
      <h1 style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: theme["cyan.2"],
            borderRadius: "50%",
            padding: "8px", // Optional: Add padding to control the spacing between the image and the background
          }}
        >
          <img
            src="./icons/icon_WorkOrderManagement.png"
            alt="Work Order"
            style={{ width: "48px" }}
          />
        </div>{" "}
        Water Work Order - Meter Change
      </h1>

      <div
        style={{
          background: "rgba(188, 195, 200,0.1)",
          borderRadius: "8px",

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
      <IssueWorkOrder theme={theme} />
      {/* Add the rest of your component content */}
    </div>
  );
};

export default WaterWorkOrderMeterChange;
