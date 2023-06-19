import React from "react";

interface CustomerIcNameBoardProps {
  customerTitle: string | undefined;
  customerName: string;
  selectedOption?: string; // Make selectedOption prop optional
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  customerTitle,
  customerName,
  selectedOption,
}) => {
  let backgroundColor = "#e6edf4"; // Default background color

  if (selectedOption === "MyTentera") {
    backgroundColor = "#f1eff2"; // Set background color for MyTentera option
  } else if (selectedOption === "MyPR") {
    backgroundColor = "#f2e6e6"; // Set background color for MyPR option
  } else if (selectedOption === "MyKAS") {
    backgroundColor = "#e7eee6"; // Set background color for MyKAS option
  } else if (selectedOption === "Commercial") {
    backgroundColor = "#faeadf"; // Set background color for Commercial option
  }

  return (
    <div
      style={{
        height: 30,
        width: "100%",
        padding: "1px 4px 1px 4px",
        alignContent: "center",
        justifyContent: "center",
        fontWeight: "bold",
        borderRadius: 16,
        background: backgroundColor, // Use the backgroundColor variable
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 35,
          alignContent: "center",
          justifyContent: "center",
          margin: "-10px 0px 0px 10px",
          opacity: 0.12, // Set the opacity value to make the text translucent
          wordWrap: "break-word", // Allow long text to wrap
          whiteSpace: "pre-wrap", // Preserve line breaks
        }}
      >
        I/C Number <br />
        // {customerTitle} {customerName} //
      </div>
    </div>
  );
};

export default CustomerIcNameBoard;
