import { ProCard } from "@ant-design/pro-card";
import { Collapse } from "antd";
import React, { useState } from "react";
import "./IdTypeBoard.css";

const { Panel } = Collapse;

interface Theme {
  [key: string]: string;
}

interface IdTypeBoardProps {
  selectedOption: string;
  theme: Theme;
}

const IdTypeBoard: React.FC<IdTypeBoardProps> = ({ selectedOption }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  let boardClassName = "id-type-board";

  if (selectedOption === "MyKad") {
    boardClassName += theme["myKad"];
  } else if (selectedOption === "MyTentera") {
    boardClassName += " myTentera-board";
  } else if (selectedOption === "MyPR") {
    boardClassName += " myPR-board";
  } else if (selectedOption === "MyKAS") {
    boardClassName += " myKAS-board";
  } else if (selectedOption === "Commercial") {
    boardClassName += " forCommercial-board";
  }

  // Add the initial color class
  boardClassName += " myKad-board";

  return (
    <ProCard
      className={boardClassName}
      title={`${selectedOption} Customer Info Summary Board`}
      style={{ padding: "0px", width: "250px" }}
      collapsible
    >
      <p>
        This is the notification board for ID type <b>{selectedOption}</b> with
        its relevant theme colour. The background color changes based on the
        selected option in the IdType component. It also will notify the user
        whether the form below will be a new registration form or an account
        registration:
      </p>
      <p>
        <b>
          "This I/C number is not currently registered in our system. Please
          proceed with the New Registration process."
        </b>
      </p>
      <p>
        <b>
          "This I/C number is currently registered in our system with x number
          of account(s). Please proceed with the Additional Account Registration
          process."
        </b>
      </p>
    </ProCard>
  );
};

export default IdTypeBoard;
