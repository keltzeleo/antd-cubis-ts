import { ProFormItem } from "@ant-design/pro-form";
import { Input, Select } from "antd";

import { useState } from "react";
import "./IdType.css";

const { Option } = Select;

interface IdTypeProps {
  onChange: (value: string) => void;
}

const IdType: React.FC<IdTypeProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("MyKad");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
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
      <div>

  );
};

export default IdType;
