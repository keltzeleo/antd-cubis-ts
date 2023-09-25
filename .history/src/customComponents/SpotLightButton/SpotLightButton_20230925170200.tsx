import { Avatar, Button } from "antd";
import React from "react";

interface SpotlightButtonProps {
  scenario: string;
  iconSrc: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SpotlightButton: React.FC<SpotlightButtonProps> = ({
  scenario,
  iconSrc,
  label,
  isSelected,
  onClick,
}) => (
  <Button
    style={{
      paddingLeft: "16px",
      margin: "12px 10px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      width: "auto",
      height: "auto",
      border: "1px dashed #00a991",
    }}
    type={isSelected ? "primary" : "default"}
    onClick={onClick}
    className={`segmented-button ${isSelected ? "selected" : ""}`}
  >
    <div>
      <Avatar
        style={{
          backgroundColor: "#f3f6f9",
          marginTop: "6px",
          marginBottom: "-4px",
        }}
        src={iconSrc}
      />
      <div style={{ padding: "8px" }}>{label}</div>
    </div>
  </Button>
);

export default SpotlightButton;
