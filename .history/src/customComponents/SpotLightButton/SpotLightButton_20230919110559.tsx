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
  <div
    style={{
      background: "rgba(245, 250, 240,0.1)",
      margin: 8,
      display: "flex",
      borderRadius: "8px",
    }}
  >
    <Button
      style={{
        paddingLeft: "16px",
        margin: "10px 10px",
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
            backgroundColor: "#fff",
            marginTop: "2px",
            marginBottom: "-4px",
          }}
          src={iconSrc}
        />
        <div style={{ padding: "8px" }}>{label}</div>
      </div>
    </Button>
  </div>
);

export default SpotlightButton;
