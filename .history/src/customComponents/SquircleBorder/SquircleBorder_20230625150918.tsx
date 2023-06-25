import { Typography } from "antd";
import React from "react";

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
  style?: React.CSSProperties;
}

const SquircleBorder: React.FC<SquircleBorderProps> = ({
  size = 200,
  curvature = 0.5,
  backgroundColor = "#FADB5F",
  rotate = 0,
  borderType = "solid",
  borderWidth = 2,
  borderColor = "#000",
  fontWeight = 400,
  character = "",
  style = {},
}) => {
  const squircleStyle: React.CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: `${size * curvature}px`,
    backgroundColor,
    transform: `rotate(${rotate}deg)`,
    position: "relative",
    overflow: "hidden",
    ...style,
  };

  const characterStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    fontWeight,
  };

  const borderStyle: React.CSSProperties = {
    position: "absolute",
    top: `${borderWidth}px`,
    left: `${borderWidth}px`,
    width: `calc(100% - ${2 * borderWidth}px)`,
    height: `calc(100% - ${2 * borderWidth}px)`,
    border: `${borderWidth}px ${borderType} ${borderColor}`,
    borderRadius: `${size * curvature - borderWidth}px`,
    boxSizing: "border-box",
  };

  return (
    <div style={squircleStyle}>
      <div style={characterStyle}>
        <Typography.Text style={{ fontSize: size / 2 }}>
          {character}
        </Typography.Text>
      </div>
      <div style={borderStyle}></div>
    </div>
  );
};

export default SquircleBorder;
