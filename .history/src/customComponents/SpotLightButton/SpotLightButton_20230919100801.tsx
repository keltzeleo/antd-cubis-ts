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
      margin: "10px", // Adjust margin for horizontal spacing
      display: "flex",
      flexDirection: "row", // Set to "row" for horizontal alignment
      alignItems: "center",
      width: "auto",
      height: "auto",
      border: "1px dashed #00a991",
    }}
    type={isSelected ? "primary" : "default"}
    onClick={onClick}
    className={`segmented-button ${isSelected ? "selected" : ""}`}
  >
    <Avatar
      style={{
        backgroundColor: "#fff",
        marginRight: "8px", // Add margin for spacing between Avatar and text
      }}
      src={iconSrc}
    />
    <div style={{ padding: "8px" }}>{label}</div>
  </Button>
);

export default SpotlightButton;
