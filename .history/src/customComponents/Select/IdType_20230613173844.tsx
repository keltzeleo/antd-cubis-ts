import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface SelectBeforeComponentProps {
  selectedOption: string;
  handleOptionChange: (value: string) => void;
}

const IdType: React.FC<SelectBeforeComponentProps> = ({
  selectedOption,
  handleOptionChange,
}) => (
  <Select
    value={selectedOption}
    onChange={handleOptionChange}
    className={
      selectedOption === "MyKad"
        ? "myKad-select"
        : selectedOption === "MyTentera"
        ? "myTentera-select"
        : selectedOption === "MyPR"
        ? "myPR-select"
        : selectedOption === "MyKAS"
        ? "myKAS-select"
        : "forCommercial-select"
    }
  >
    <Option value="MyKad" className="myKad-option">
      MyKad
    </Option>
    <Option value="MyTentera" className="myTentera-option">
      MyTentera
    </Option>
    <Option value="MyPR" className="myPR-option">
      MyPR
    </Option>
    <Option value="MyKAS" className="myKAS-option">
      MyKAS
    </Option>
    <Option value="Commercial" className="forCommercial-option">
      Commercial
    </Option>
  </Select>
);

export default IdType;
