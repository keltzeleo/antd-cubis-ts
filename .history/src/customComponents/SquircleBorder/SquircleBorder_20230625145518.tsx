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
  const createSquirclePath = (s: number, curvature: number, rotate: number) => {
    // Remaining code...

    return pathNode;
  };

  const createSquircleSVG = (
    s: number,
    pathNode: SVGPathElement,
    character: string
  ) => {
    // Remaining code...

    return SVGNode;
  };

  const createSquircle = () => {
    // Remaining code...

    return squircleSVG;
  };

  React.useEffect(() => {
    const target = document.getElementById("squircle");
    const squircle = createSquircle();

    if (target) {
      target.appendChild(squircle);
    }

    return () => {
      if (target) {
        target.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        display: "inline-block",
        ...style,
      }}
    >
      <Typography.Text
        id="squircle"
        style={{
          fontWeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {character}
      </Typography.Text>
    </div>
  );
};

export default SquircleBorder;
