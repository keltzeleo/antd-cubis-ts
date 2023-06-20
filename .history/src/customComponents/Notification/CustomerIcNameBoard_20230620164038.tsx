import { adjustHue, mix } from "polished";
import React from "react";

interface CustomerIcNameBoardProps {
  customerTitle: string | undefined;
  customerName: string;
  selectedOption?: string; // Make selectedOption prop optional
  inputIcNumber: string; // Updated prop name
  onInputIcNumberChange?: (value: string) => void; // Add prop for input IC number change handler
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  customerTitle,
  customerName,
  selectedOption,
  inputIcNumber,
  onInputIcNumberChange, // Add the prop for input IC number change handler
}) => {
  let idTypeBgColour = "#e6edf4"; // Default background color

  if (selectedOption === "MyTentera") {
    idTypeBgColour = "#f1eff2"; // Set background color for MyTentera option
  } else if (selectedOption === "MyPR") {
    idTypeBgColour = "#f2e6e6"; // Set background color for MyPR option
  } else if (selectedOption === "MyKAS") {
    idTypeBgColour = "#e7eee6"; // Set background color for MyKAS option
  } else if (selectedOption === "Commercial") {
    idTypeBgColour = "#faeadf"; // Set background color for Commercial option
  }

  const backgroundHue = adjustHue(0.6, idTypeBgColour); // Extract the hue from the background color
  const greyColour = "rgba(23,18,20, 0.22)"; // Replace with your desired grey color value
  const darkerColour = mix(0.28, backgroundHue, greyColour); // Adjust the darkness level (0.2) as per your preference

  const handleInputIcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputIcNumberChange(e.target.value);
  };

  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        padding: "1px 4px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        paddingLeft: 16,
        justifyContent: "flex-start", // Align content to the left
        fontWeight: "bold",
        borderRadius: 16,
        background: idTypeBgColour,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 35,
          color: darkerColour,
          // Set the opacity value to make the text translucent
        }}
      >
        {inputIcNumber} ||&nbsp;
      </div>
      <div
        style={{
          fontSize: 35,
          color: darkerColour,
          overflowWrap: "break-word",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {customerTitle} {customerName}
      </div>
      <div>
        <input
          type="text"
          value={inputIcNumber}
          onChange={handleInputIcChange}
        />
      </div>
    </div>
  );
};

export default CustomerIcNameBoard;
