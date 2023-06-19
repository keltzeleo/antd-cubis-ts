import React from "react";

interface CustomerIcNameBoardProps {
  customerTitle: string | undefined;
  customerName: string;
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  customerTitle,
  customerName,
}) => {
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
        background: "#e7eee6",
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
        }}
      >
        I/C Number // {customerTitle} {customerName} //
      </div>
    </div>
  );
};

export default CustomerIcNameBoard;
