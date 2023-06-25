import { Typography } from "antd";
import React from "react";

interface SquircleBorderProps {
  size?: number;
  curvature?: number;
  fill?: string;
  rotate?: number;
  borderType?: "solid" | "dashed" | "dotted";
  borderWidth?: number;
  borderColor?: string;
  fontWeight?: number;
  character?: string;
}

const SquircleBorder: React.FC<SquircleBorderProps> = ({
  size = 200,
  curvature = 0.5,
  fill = "#4C3EF7",
  rotate = 0,
  borderType = "solid",
  borderWidth = 2,
  borderColor = "#000",
  fontWeight = 400,
  character = "",
}) => {
  const createSquirclePath = (s: number, curvature: number, rotate: number) => {
    const pathNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const halfSize = s / 2;
    const arc = halfSize * (1 - curvature);

    const d = `
        M 0 ${halfSize}
        C 0 ${arc}, ${arc} 0, ${halfSize} 0
        S ${s} ${arc}, ${s} ${halfSize}, ${s - arc} ${s}
          ${halfSize} ${s}, 0 ${s - arc}, 0 ${halfSize}
    `;

    const transform = `
        rotate(
            ${rotate},
            ${s / 2},
            ${s / 2}
        )
    `;

    pathNode.setAttribute("d", d);
    pathNode.setAttribute("transform", transform);

    return pathNode;
  };

  const createSquircleSVG = (
    s: number,
    pathNode: SVGPathElement,
    character: string
  ) => {
    const SVGNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    SVGNode.setAttribute("viewBox", `0 0 ${s} ${s}`);
    SVGNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    SVGNode.setAttribute("version", "1.1");

    SVGNode.appendChild(pathNode);

    if (character) {
      const textNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      textNode.setAttribute("x", `${s / 2}`);
      textNode.setAttribute("y", `${s / 2}`);
      textNode.setAttribute("dominant-baseline", "middle");
      textNode.setAttribute("text-anchor", "middle");
      textNode.setAttribute("font-weight", `${fontWeight}`);
      textNode.textContent = character;
      SVGNode.appendChild(textNode);
    }

    return SVGNode;
  };

  const createSquircle = () => {
    const path = createSquirclePath(size, curvature, rotate);
    const squircleSVG = createSquircleSVG(size, path, character);

    squircleSVG.setAttribute("fill", fill);
    squircleSVG.setAttribute("stroke", borderColor);
    squircleSVG.setAttribute("stroke-width", `${borderWidth}`);
    squircleSVG.setAttribute("stroke-dasharray", borderType);

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
  );
};

export default SquircleBorder;
