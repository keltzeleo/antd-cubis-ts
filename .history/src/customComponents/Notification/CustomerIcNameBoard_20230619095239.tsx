import { useEffect, useState } from "react";

interface CustomerIcNameBoardProps {
  namePrefix: string | undefined;
  name: string;
}

const CustomerIcNameBoard: React.FC<CustomerIcNameBoardProps> = ({
  namePrefix,
  name,
}) => {
  const [boardClassName, setBoardClassName] = useState("ic-number-board");

  useEffect(() => {
    let newBoardClassName = "ic-number-board";

    // Add additional CSS classes based on namePrefix and name
    if (namePrefix === "Mr." && name === "John Doe") {
      newBoardClassName += " johnDoe-board";
    } else if (namePrefix === "Ms." && name === "Jane Smith") {
      newBoardClassName += " janeSmith-board";
    } else if (namePrefix === "Mdm." && name === "Emily Brown") {
      newBoardClassName += " emilyBrown-board";
    }

    setBoardClassName(newBoardClassName);
  }, [namePrefix, name]);

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
        background: "#6d8099",
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
