import { Select } from "antd";
import "./IdTypeBoard.css";

const { Option } = Select;

interface IdTypeBoardProps {
  selectedOption: string;
}

const IdTypeBoard: React.FC<IdTypeBoardProps> = ({ selectedOption }) => {
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
    <div className={boardClassName} style={{ padding: "20px", width: "90%" }}>
      <h2>{selectedOption} Board</h2>
      <p>
        This is the<b> {selectedOption} notificaton </b>board. The background
        color changes based on the selected option in the IdType component. It
        also will notify user whether the form below will be a new registration
        form or an account registration.
      </p>
    </div>
  );
};

export default IdTypeBoard;
