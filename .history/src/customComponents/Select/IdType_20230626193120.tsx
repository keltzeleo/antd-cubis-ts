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
      const isValid = isValidDate(value);

      if (!isValid) {
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
