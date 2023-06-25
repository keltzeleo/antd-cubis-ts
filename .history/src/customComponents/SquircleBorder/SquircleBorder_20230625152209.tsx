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
  const formattedSize = `${size}px`;
  const formattedCurvature = `${curvature * 100}%`;
  const formattedRotate = `${rotate}deg`;
  const formattedBorderWidth = `${borderWidth}px`;
  const formattedCharacterSize = `${size / 2}px`;

  const svgStyle: React.CSSProperties = {
    width: formattedSize,
    height: formattedSize,
    transform: `rotate(${formattedRotate})`,
    ...style,
  };

  const pathStyle: React.CSSProperties = {
    fill: backgroundColor,
  };

  const textStyle: React.CSSProperties = {
    dominantBaseline: "middle",
    textAnchor: "middle",
    fontWeight,
    fontSize: formattedCharacterSize,
  };

  const borderStyle: React.CSSProperties = {
    stroke: borderColor,
    strokeWidth: formattedBorderWidth,
    fill: "none",
    strokeDasharray:
      borderType === "dashed"
        ? "4 4"
        : borderType === "dotted"
        ? "2 2"
        : "none",
    ...style, // Merge with the provided style prop
  };

  const createSquirclePath = (): string => {
    const path = `
      M 0 ${formattedCurvature}
      C 0 2.9399999999999995 2.9399999999999995 0 14 0
      S 28 2.9399999999999995 28 14
      25.060000000000002 28 14 28
      0 25.060000000000002 0 14
      Z
    `;

    return path;
  };

  return (
    <svg viewBox={`0 0 ${formattedSize} ${formattedSize}`} style={svgStyle}>
      <path d={createSquirclePath()} style={pathStyle} />
      <text x="50%" y="50%" style={textStyle}>
        {character}
      </text>
      <path d={createSquirclePath()} style={borderStyle} />
    </svg>
  );
};

export default SquircleBorder;
