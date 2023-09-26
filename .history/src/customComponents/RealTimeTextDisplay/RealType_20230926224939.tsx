import { adjustHue, mix } from "polished"; // Import the polished library
import React from "react";

interface RealTypeProps {
  primaryText: string;
  secondaryText: string;
  additionalText: string;
}

const RealType: React.FC<RealTypeProps> = ({
  primaryText,
  secondaryText,
  additionalText,
}) => {
  let idTypeBgColour = "#00a991"; // Default background color

  // Your logic for adjusting the background color based on selectedOption goes here

  const backgroundHue = adjustHue(0.23, idTypeBgColour); // Extract the hue from the background color
  const greyColour = "rgba(23,18,18, 0.40)"; // Replace with your desired grey color value
  const darkerColour = mix(0.38, backgroundHue, greyColour); // Adjust the darkness level (0.2) as per your preference

  return (
    <div
      style={{
        height: "auto",
        width: "120%",
        padding: "1px 4px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        paddingLeft: 16,
        justifyContent: "flex-start",
        fontWeight: "bold",
        borderRadius: 16,
        background: idTypeBgColour, // Background color
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 30,
          color: darkerColour, // Text color
          display: "flex",
          alignItems: "center",
          marginRight: 8,
        }}
      >
        {primaryText}
      </div>
      <div
        style={{
          fontSize: 30,
          color: darkerColour, // Text color
          overflowWrap: "break-word",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        &bull; {secondaryText} &bull; {additionalText}
      </div>
    </div>
  );
};

export default RealType;
