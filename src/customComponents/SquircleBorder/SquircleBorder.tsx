import React, { CSSProperties } from "react";

interface SquircleBorderProps {
  size?: number;
  curvature?: number;
  backgroundColor?: string;
  rotate?: number;
  borderType?: "solid" | "dashed" | "dotted";
  borderWidth?: number;
  borderColor?: string;
  fontWeight?: number;
  character?: string;
}

const SquircleBorder: React.FC<SquircleBorderProps> = ({
  size = 50,
  curvature = 0.5,
  backgroundColor = "#000",
  rotate = 0,
  borderType = "solid",
  borderWidth = 1,
  borderColor = "#000",
  fontWeight = 400,
  character = "",
}) => {
  const containerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size * curvature}px`,
    backgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: `rotate(${rotate}deg)`,
    borderStyle: borderType,
    borderWidth: `${borderWidth}px`,
    borderColor,
  };

  const textStyle: CSSProperties = {
    fontSize: `${size * 0.65}px`, // Adjust the scaling factor as per your requirements

    fontWeight,
  };

  return (
    <div style={containerStyle}>
      <span style={textStyle}>{character}</span>
    </div>
  );
};

export default SquircleBorder;
