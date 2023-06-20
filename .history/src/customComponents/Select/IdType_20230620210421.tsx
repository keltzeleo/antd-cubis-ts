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

  const isValidDayOfMonth = (day: string): boolean => {
    const dayOfMonth = parseInt(day, 10);
    return dayOfMonth >= 1 && dayOfMonth <= 31;
  };

  const isValidMonthOfYear = (month: string): boolean => {
    const monthOfYear = parseInt(month, 10);
    return monthOfYear >= 1 && monthOfYear <= 12;
  };

  const handleIcNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setErrorMessage("");
    } else if (value.length === 6) {
      const day = value.slice(0, 2);
      const month = value.slice(2, 4);
      const year = value.slice(4, 6);

      const thirdDigit = value.charAt(2);
      const combinedMonth = parseInt(month, 10);
      const combinedYear = parseInt(year, 10) + 2000;

      const isValidDay = parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31;
      const isValidThirdDigit =
        thirdDigit === "" || parseInt(thirdDigit, 10) <= 1;
      const isValidMonth = combinedMonth >= 1 && combinedMonth <= 12;
      const isValidYear = combinedYear >= 1900 && combinedYear <= 2099;

      const isDateValid =
        isValidDay && isValidThirdDigit && isValidMonth && isValidYear;

      if (!isDateValid) {
        setErrorMessage("Invalid Format");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }

    setInputValue(value);
    onInputChange(value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
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

    // Automatically format the input by
    // adding dashes
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
      <Button style={{ marginLeft: 8 }} type="primary">
        Search
      </Button>
      {errorMessage && (
        <div>
          <p></p>
          <div className="error-message">{errorMessage}</div>
        </div>
      )}{" "}
    </div>
  );
};

export default IdType;
