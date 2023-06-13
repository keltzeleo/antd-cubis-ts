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
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div>
        <label htmlFor="idType">ID:</label>
      </div>
      <div>
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
      </div>
      <div>
        <Input
          style={{
            width: "100%", // adjust the width according to your layout
          }}
          placeholder="12-digit number on ID Card"
          maxLength={14} // Increased maxLength to accommodate dashes
          pattern="^[0-9-]*$" // Updated pattern to allow dashes as well
          title="ID number must contain only digits"
          onKeyDown={(event) => {
            // Add your keydown logic here
          }}
        />
      </div>
    </div>
  );
};

export default IdType;
