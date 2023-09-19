import React, { useState } from "react";
import SpotlightButton from "../../../customComponents/SpotLightButton/SpotLightButton"; // Import the SpotlightButton component

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

  // Define a configuration object for scenario data with dynamic labels and icons
  const spotlightButtonData = [
    {
      scenario: "issueNewWorkOrder",
      iconSrc: "./icons/icon_IssueWorkOrder.png",
      label: "Issue New Work Order",
    },
    {
      scenario: "completeWorkOrder",
      iconSrc: "./icons/icon_accountTransfer.png",
      label: "Complete Work Order",
    },
    {
      scenario: "cancelWorkOrder",
      iconSrc: "./icons/icon_temporarySupply.png",
      label: "Cancel Work Order",
    },

    // Add more scenarios as needed
  ];

  return (
    <div>
      <h1>Water Work Order - Meter Change</h1>
      aaaaaaa
      <div>
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
      {/* Add the rest of your component content */}
    </div>
  );
};

export default WaterWorkOrderMeterChange;
