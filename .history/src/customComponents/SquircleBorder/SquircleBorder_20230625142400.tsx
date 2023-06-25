import { Input } from "antd";
import React from "react";

interface SquircleBorderProps {
  borderColor?: string;
  borderType?: "solid" | "dashed" | "dotted";
  borderWidth?: number;
  fontWeight?: number;
  scale?: number;
  transparency?: number;
  backgroundColor?: string;
  rotation?: number;
  character?: string;
}

const SquircleBorder: React.FC<SquircleBorderProps> = ({
  borderColor = "#000",
  borderType = "solid",
  borderWidth = 2,
  fontWeight = 400,
  scale = 1,
  transparency = 1,
  backgroundColor = "#fff",
  rotation = 0,
  character = "",
}) => {
  const svgStyle = {
    fill: backgroundColor,
    transform: `rotate(${rotation}deg)`,
    opacity: transparency,
  };

  const borderStyle = {
    border: `${borderWidth}px ${borderType} ${borderColor}`,
    transform: `scale(${scale})`,
    borderRadius: "50%",
    padding: "10px",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        <path
          d="
              M 0, 75
              C 0, 18.75 18.75, 0 75, 0
              S 150, 18.75 150, 75
              131.25, 150 75, 150
              0, 131.25 0, 75
            "
          fill={backgroundColor}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontWeight,
        }}
      >
        <Input value={character} />
      </div>
    </div>
  );
};

export default SquircleBorder;
