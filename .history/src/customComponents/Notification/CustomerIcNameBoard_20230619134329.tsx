import React from "react";

interface CustomerIcNameBoardProps {
  customerTitle: string;
  customerName: string;
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  customerTitle,
  customerName,
}) => {
  return (
    <div className="ic-number-board">
      <div style={{ fontSize: 35 }}>
        I/C Number // {customerTitle} {customerName} //
      </div>
    </div>
  );
};

export default CustomerIcNameBoard;
