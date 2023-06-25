import { Input } from "antd";
import React from "react";

interface SquircleBorderProps {
  borderColor?: string;
  fontWeight?: number;
  scale?: number;
  transparency?: number;
  backgroundColor?: string;
  rotation?: number;
  character?: string;
}

const SquircleBorder: React.FC<SquircleBorderProps> = ({
  borderColor = "#000",
  fontWeight = 400,
  scale = 1,
  transparency = 1,
  backgroundColor = "#fff",
  rotation = 0,
  character = "",
}) => {
  const borderSize = `${scale}px`;

  const borderStyle = {
    borderRadius: `${scale}px / ${scale * 2}px`,
    border: `2px solid ${borderColor}`,
    fontWeight,
    transform: `rotate(${rotation}deg)`,
    opacity: transparency,
    backgroundColor,
    padding: "10px", // Adjust as needed
  };

  return (
    <div style={borderStyle}>
      <Input value={character} />
    </div>
  );
};

export default SquircleBorder;
