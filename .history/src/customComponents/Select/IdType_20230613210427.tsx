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
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
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
            const key = event.key;
            const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
            ];
            const input = event.target as HTMLInputElement;
            const selectionStart = input.selectionStart || 0;
            const selectionEnd = input.selectionEnd || 0;
            const value = input.value;

            if (
              !/^\d*$/.test(key) && // Check if the key is a digit
              !allowedKeys.includes(key) && // Check if the key is allowed (e.g., Backspace, Delete, Arrow keys)
              !(key === "Control" && navigator.platform.match("Mac")
                ? event.metaKey
                : event.ctrlKey) // Check if it's a control key combination (e.g., Ctrl+C, Ctrl+V)
            ) {
              event.preventDefault();
            }

            // Automatically format the input by adding dashes
            if (!allowedKeys.includes(key)) {
              let formattedValue = value;
              if (selectionStart === selectionEnd) {
                if (selectionStart === 6 || selectionStart === 9) {
                  formattedValue += "-";
                }
              } else {
                formattedValue =
                  value.slice(0, selectionStart) +
                  "-" +
                  value.slice(selectionStart, selectionEnd) +
                  value.slice(selectionEnd);
              }
              input.value = formattedValue;
            }
          }}
        />
      </div>
    </div>
  );
};

export default IdType;
