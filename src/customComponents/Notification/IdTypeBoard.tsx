import { Collapse, Switch } from "antd";

import React, { useState } from "react";
import "./IdTypeBoard.css";

const { Panel } = Collapse;

interface IdTypeBoardProps {
  selectedOption: string;
}

const IdTypeBoard: React.FC<IdTypeBoardProps> = ({ selectedOption }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  let boardClassName = "id-type-board";

  if (selectedOption === "MyKad") {
    boardClassName += " myKad-board";
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
    <div className={boardClassName} style={{ padding: "20px", width: "100%" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedOption} Customer Info Summary Board
        <Switch
          checked={!collapsed}
          checkedChildren="Show"
          unCheckedChildren="Hide"
          defaultChecked
          onChange={toggleCollapse}
        />
      </h2>
      {!collapsed && (
        <Collapse bordered={false} defaultActiveKey="1">
          <Panel header={null} key="1">
            <p>
              This is the notification board for ID type{" "}
              <b> {selectedOption} </b> with its relevant theme colour. The
              background color changes based on the selected option in the
              IdType component. It also will notify the user whether the form
              below will be a new registration form or an account registration:
            </p>
            <p>
              <b>
                "This I/C number is not currently registered in our system.
                Please proceed with the New Registration process."
              </b>
            </p>
            <p>
              <b>
                "This I/C number is currently registered in our system with x
                number of account(s). Please proceed with the Additional Account
                Registration process."
              </b>
            </p>
          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default IdTypeBoard;
