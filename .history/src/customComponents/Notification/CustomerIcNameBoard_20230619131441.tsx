import React from "react";

interface CustomerIcNameBoardProps {
  namePrefix: string | undefined;
  name: string;
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  namePrefix,
  name,
}) => {
  const getBoardClassName = () => {
    let newBoardClassName = "ic-number-board";

    if (namePrefix === "MyKad") {
      newBoardClassName += " myKad-board";
    } else if (namePrefix === "MyTentera") {
      newBoardClassName += " myTentera-board";
    } else if (namePrefix === "MyPR") {
      newBoardClassName += " myPR-board";
    } else if (namePrefix === "MyKAS") {
      newBoardClassName += " myKAS-board";
    } else if (namePrefix === "Commercial") {
      newBoardClassName += " forCommercial-board";
    }

    return newBoardClassName;
  };

  const boardClassName = getBoardClassName();

  return (
    <div
      className={boardClassName}
      style={{
        height: 30,
        width: "100%",
        padding: "1px 4px 1px 4px",
        alignContent: "center",
        justifyContent: "center",
        fontWeight: "bold",
        borderRadius: 16,
        overflow: "hidden",
        color: "#f3f3f3",
        opacity: 0.7,
      }}
    >
      <div
        style={{
          fontSize: 35,
          alignContent: "center",
          justifyContent: "center",
          margin: "-10px 0px 0px 10px",
        }}
      >
        I/C Number // {namePrefix} {name} //
      </div>
    </div>
  );
};

export default CustomerIcNameBoard;
