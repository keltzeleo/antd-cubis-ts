import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface IdTypeBoardProps {
  selectedOption: string;
}

const IdTypeBoard: React.FC<IdTypeBoardProps> = ({ selectedOption }) => {
  const getBackgroundColor = () => {
    switch (selectedOption) {
      case "MyKad":
        return "#f0f0f0";
      case "MyTentera":
        return "#e6f7ff";
      case "MyPR":
        return "#f9f2ff";
      case "MyKAS":
        return "#ffe8cc";
      case "Commercial":
        return "#f9f9f9";
      default:
        return "";
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div style={{ backgroundColor, padding: "20px" }}>
      <h2>Notification Board</h2>
      <p>
        This is the notification board. The background color changes based on
        the selected option in the IdType component.
      </p>
    </div>
  );
};

export default IdTypeBoard;
