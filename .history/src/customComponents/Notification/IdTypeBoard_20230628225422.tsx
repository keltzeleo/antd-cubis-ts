import { Button, Collapse } from "antd";
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
    <Collapse
      bordered={false}
      defaultActiveKey="1"
      activeKey={collapsed ? undefined : "1"}
    >
      <Panel
        header={`${selectedOption} Notification Board`}
        key="1"
        extra={
          <Button type="text" onClick={toggleCollapse}>
            {collapsed ? "Show" : "Collapsed"}
          </Button>
        }
      >
        <div
          className={boardClassName}
          style={{ padding: "20px", width: "100%" }}
        >
          <h2>{selectedOption} Notification Board</h2>
          <p>
            This is the <b>{selectedOption} notification</b> board. The
            background color changes based on the selected option in the IdType
            component. It also will notify the user whether the form below will
            be a new registration form or an account registration:
            <p></p>
            <b>
              "This I/C number is not currently registered in our system. Please
              proceed with the New Registration process."
              <p></p>
            </b>
            or<p></p>
            <b>
              "This I/C number is currently registered in our system with x
              number of account(s). Please proceed with the Additional Account
              Registration process."
            </b>
          </p>
        </div>
      </Panel>
    </Collapse>
  );
};

export default IdTypeBoard;
