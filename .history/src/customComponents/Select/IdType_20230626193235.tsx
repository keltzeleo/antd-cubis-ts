import { Button, Input, Select } from "antd";
import moment from "moment";
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

  const handleIcNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let errorMessage = "";

    if (value === "") {
      setErrorMessage("");
    } else if (value.length >= 6) {
      const monthValue = value.substring(2, 4); // Extract the month value
      const dateValue = value.substring(4, 6); // Extract the date value

      const isValidMonth =
        parseInt(monthValue, 10) >= 1 && parseInt(monthValue, 10) <= 12;

      const monthHas31Days = [1, 3, 5, 7, 8, 10, 12]; // Months with 31 days
      const monthHas30Days = [4, 6, 9, 11]; // Months with 30 days
      const monthHas28or29Days = 2; // February with either 28 or 29 days (leap year)

      let isValidDate = false;

      if (isValidMonth) {
        const month = parseInt(monthValue, 10);
        const date = parseInt(dateValue, 10);

        if (monthHas31Days.includes(month)) {
          isValidDate = date >= 1 && date <= 31;
        } else if (monthHas30Days.includes(month)) {
          isValidDate = date >= 1 && date <= 30;
        } else if (month === monthHas28or29Days) {
          const yearValue = value.substring(0, 2); // Extract the year value
          const isLeapYear = moment(yearValue, "YY").isLeapYear();
          isValidDate =
            (isLeapYear && date >= 1 && date <= 29) ||
            (!isLeapYear && date >= 1 && date <= 28);
        }
      }

      if (!isValidMonth || !isValidDate) {
        errorMessage = "Invalid Format";
      }
    }

    setErrorMessage(errorMessage);
    setInputValue(value);
    if (errorMessage === "") {
      onInputChange(value);
    }
  };

  const isValidDate = (value: string): boolean => {
    const year = value.substring(0, 2);
    const month = value.substring(2, 4);
    const date = value.substring(5, 6);

    const formattedDate = moment(`${year}-${month}-${date}`, "YY-MM-DD", true);

    return (
      formattedDate.isValid() &&
      formattedDate.format("YY") === year &&
      formattedDate.format("MM") === month &&
      formattedDate.format("DD") === date
    );
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight"];
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

    if (errorMessage !== "" && key !== "Backspace" && key !== "Delete") {
      event.preventDefault();
    }
  };

  const handleSearch = () => {
    // Perform search based on the selectedOption and inputValue
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
                width: "250px",
              }}
              placeholder="12-digit number on ID Card"
              maxLength={14}
              pattern="^[0-9-]*$"
              title="ID number must contain only digits"
              onKeyDown={handleInputKeyDown}
              onChange={handleIcNumberChange}
              value={inputValue}
            />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 8 }} className="search-button-container">
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default IdType;
