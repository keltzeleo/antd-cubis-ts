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
  const [icNumber, setIcNumber] = useState("");
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
    } else if (value.length === 6) {
      const year = parseInt(value.slice(0, 2), 10) + 2000;
      const month = parseInt(value.slice(2, 4), 10);
      const day = parseInt(value.slice(4, 6), 10);

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        errorMessage = "Invalid Format Detected";
      } else {
        const isValidDay = isValidDayOfMonth(year, month, day);
        const isValidMonth = month >= 1 && month <= 12;

        if (!isValidMonth) {
          errorMessage = "Invalid Month";
        } else if (!isValidDay) {
          errorMessage = "Invalid Day for the Selected Month";
        }
      }
    }

    setErrorMessage(errorMessage);
    setInputValue(value);
    onInputChange(value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const cursorPosition = input.selectionStart || 0;
    let errorMessage = "";

    if (value.length === 6 && key !== "Backspace" && key !== "Delete") {
      // Prevent input when value length is already 6, except for Backspace and Delete keys
      event.preventDefault();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      // Allow Backspace and Delete keys for input deletion
      setInputValue(value); // Update input value without formatting
      setErrorMessage("");
      return;
    }

    if (!/^\d$/.test(key)) {
      // Allow only digits
      event.preventDefault();
      return;
    }

    const updatedValue =
      value.slice(0, cursorPosition) + key + value.slice(cursorPosition);
    const year = parseInt(updatedValue.slice(0, 2), 10) + 2000;
    const month = parseInt(updatedValue.slice(2, 4), 10);
    const day = parseInt(updatedValue.slice(4, 6), 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      errorMessage = "Invalid Format Detected";
    } else if (month >= 1 && month <= 12) {
      const isValidDay = isValidDayOfMonth(year, month, day);
      if (!isValidDay) {
        errorMessage = "Invalid Day for the Selected Month";
      }
    } else {
      errorMessage = "Invalid Month";
    }

    setInputValue(updatedValue);
    setErrorMessage(errorMessage);
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
