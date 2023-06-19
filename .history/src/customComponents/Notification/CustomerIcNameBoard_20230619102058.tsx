import { useEffect, useState } from "react";

interface CustomerIcNameBoardProps {
  selectedOption: string;
  namePrefix: string | undefined;
  name: string;
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  selectedOption,
  namePrefix,
  name,
}) => {
  const [boardClassName, setBoardClassName] = useState("ic-number-board");

  useEffect(() => {
    let newBoardClassName = "ic-number-board";

    if (selectedOption === "MyKad") {
      newBoardClassName += " myKad-board";
    } else if (selectedOption === "MyTentera") {
      newBoardClassName += " myTentera-board";
    } else if (selectedOption === "MyPR") {
      newBoardClassName += " myPR-board";
    } else if (selectedOption === "MyKAS") {
      newBoardClassName += " myKAS-board";
    } else if (selectedOption === "Commercial") {
      newBoardClassName += " forCommercial-board";
    }

    setBoardClassName(newBoardClassName);
  }, [selectedOption]);

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
        opacity: 0.7, // Set the opacity value to make the text translucent
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
