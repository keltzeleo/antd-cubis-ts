import { Avatar, Button } from "antd";
import React, { useState } from "react";

const MyForm: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleButtonClick = (value: string) => {
    setSelectedItem(value);
  };

  const renderScenarioButton = (
    scenario: string,
    iconSrc: string,
    label: string
  ) => (
    <Button
      style={{
        margin: "10px 10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        height: "auto",
        border: "1px dashed #00a991",
      }}
      type={selectedItem === scenario ? "primary" : "default"}
      onClick={() => handleButtonClick(scenario)}
      className={`segmented-button ${
        selectedItem === scenario ? "selected" : ""
      }`}
    >
      <div>
        <Avatar
          style={{
            backgroundColor: "#fff",
            marginTop: "2px",
            marginBottom: "-4px",
          }}
          src={iconSrc}
        />
        <div style={{ padding: "8px" }}>{label}</div>
      </div>
    </Button>
  );

  return (
    <div>
      {renderScenarioButton(
        "newWaterSupply",
        "./icons/icon_IndividualApplication.png",
        "New Water Supply"
      )}
      {renderScenarioButton(
        "accountTransfer",
        "./icons/icon_accountTransfer.png",
        "Account Transfer"
      )}
      {renderScenarioButton(
        "tempSup",
        "./icons/icon_temporarySupply.png",
        "Temporary Supply"
      )}
      {renderScenarioButton(
        "cof",
        "./icons/icon_changeOfTenancy.png",
        "Change of Tenancy"
      )}
    </div>
  );
};

export default WaterWorkOrderMeterChange;
