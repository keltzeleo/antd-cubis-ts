import { Select } from "antd";

const { Option } = Select;

interface IdTypeBoardProps {
  selectedOption: string;
}

const IdTypeBoard = ({ selectedOption }) => {
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

  return (
    <div className={boardClassName} style={{ padding: "20px" }}>
      <h2>Notification Board</h2>
      <p>
        This is the notification board. The background color changes based on
        the selected option in the IdType component.
      </p>
    </div>
  );
};

export default IdTypeBoard;
