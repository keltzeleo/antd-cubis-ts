import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import "./IdType.css";

const { Option } = Select;

interface IdTypeProps {
  onChange: (option: string, value: string) => void;
  onInputChange: (value: string) => void;
}

const IdType: React.FC<IdTypeProps> = ({ onChange, onInputChange }) => {
  const [selectedOption, setSelectedOption] = useState("MyKad");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value, "");
  };

  const isValidDayOfMonth = (
    year: number,
    month: number,
    day: number
  ): boolean => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  };

  const handleIcNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let errorMessage = "";
  
    if (value === "") {
      setErrorMessage("");
    } else if (value.length >= 4) {
      const year = parseInt(value.slice(0, 2), 10) + 2000;
      const month = parseInt(value.slice(2, 4), 10);
      const day = parseInt(value.slice(4, 6), 10);
  
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        errorMessage = "Invalid Format Detected";
      } else {
        const isValidMonth = month >= 1 && month <= 12;
  
        if (!isValidMonth) {
          errorMessage = "Invalid Month";
        } else if (value.length === 6) {
          const isValidDay = isValidDayOfMonth(year, month, day);
  
          if (!isValidDay) {
            errorMessage = "Invalid Day for the Selected Month";
          }
        }
      }
    }
  
    setErrorMessage(errorMessage);
    setInputValue(value);
    onInputChange(value);
  };
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
    const input = event.target as HTMLInputElement;
    const selectionStart = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;
    const value = input.value;

    if (!/^\d*$/.test(key) && !allowedKeys.includes(key)) {
      event.preventDefault();
    }

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
      setInputValue(formattedValue);
    }
  };

  return (
    <div className="id-type-container">
      <div className="id-type-option">
        <label htmlFor="idType">ID :</label>
        <div className="input-error-container">
          <div className="input-button-row">
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
              onKeyDown={handleInputKeyDown} // Updated event handler for input keydown
              onChange={handleIcNumberChange} // Updated event handler for IC number change
              value={inputValue}
            />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 8 }} className="search-button-container">
        <Button type="primary">Search</Button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default IdType;
