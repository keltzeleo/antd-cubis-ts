import React, { useState } from "react";
import SpotlightButton from "../../../customComponents/SpotLightButton/SpotlightButton"; // Import the SpotlightButton component

const WaterWorkOrderMeterChange: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
    // Perform any other actions or state management specific to this component if needed
  };

  // Define a configuration object for scenario data with dynamic labels and icons
  const spotlightButtonData = [
    {
      scenario: "newWaterSupply",
      iconSrc: "./icons/icon_IndividualApplication.png",
      label: "New Water Supply",
    },
    {
      scenario: "accountTransfer",
      iconSrc: "./icons/icon_accountTransfer.png",
      label: "Account Transfer",
    },
    {
      scenario: "tempSup",
      iconSrc: "./icons/icon_temporarySupply.png",
      label: "Temporary Supply",
    },
    {
      scenario: "cof",
      iconSrc: "./icons/icon_changeOfTenancy.png",
      label: "Change of Tenancy",
    },
    // Add more scenarios as needed
  ];

  return (
    <div>
      <h1>Water Work Order - Meter Change</h1>
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
