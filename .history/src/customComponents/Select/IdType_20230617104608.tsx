// IdType.tsx
import { Button, Input, Select } from "antd";
import React, { useState } from "react";
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
    <div className="id-type-container">
      <div className="id-type-option">
        <label htmlFor="idType">ID :</label>
        <Select
          id="idType"
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
        <Input
          style={{
            width: "250px", // adjust the width according to your layout
          }}
          placeholder="12-digit number on ID Card"
          maxLength={14} // Increased maxLength to accommodate dashes
          pattern="^[0-9-]*$" // Updated pattern to allow dashes as well
          title="ID number must contain only digits"
          onKeyDown={(event) => {
            // ...
          }}
        />
        <Button type="primary">Search</Button>
      </div>
    </div>
  );
};

export default IdType;
