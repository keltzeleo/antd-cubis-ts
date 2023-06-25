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
  size = 20,
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
  };

  const createSquirclePath = (): JSX.Element => {
    const path = `
      M 0 ${formattedCurvature}
      Q 0 0 ${formattedCurvature} 0
      H ${formattedSizeMinusCurvature}
      Q ${formattedSize} 0 ${formattedSize} ${formattedCurvature}
      V ${formattedSizeMinusCurvature}
      Q ${formattedSize} ${formattedSize} ${formattedSizeMinusCurvature} ${formattedSize}
      H ${formattedCurvature}
      Q 0 ${formattedSize} 0 ${formattedSizeMinusCurvature}
      Z
    `;

    return <path d={path} style={pathStyle} />;
  };

  return (
    <svg viewBox={`0 0 ${formattedSize} ${formattedSize}`} style={svgStyle}>
      {createSquirclePath()}
      <text x="50%" y="50%" style={textStyle}>
        {character}
      </text>
      <path d={createSquirclePath()} style={borderStyle} />
    </svg>
  );
};

export default SquircleBorder;
