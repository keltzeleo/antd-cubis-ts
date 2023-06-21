import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import "./IdType.css";

const { Option } = Select;

interface IdTypeProps {
  onChange: (option: string, value: string) => void;
  onInputChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  onHomeNumberChange: (value: string) => void;
  onAlternativeNumberChange: (value: string) => void;
}

const IdType: React.FC<IdTypeProps> = ({
  onChange,
  onInputChange,
  onMobileNumberChange,
  onHomeNumberChange,
  onAlternativeNumberChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("MyKad");
  const [icNumber, setIcNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value, "");
  };

  const isValidDayOfMonth = (dateString: string): boolean => {
    const dateParts = dateString.split(" ");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Create a new Date object and check if it represents a valid date
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
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
        setErrorMessage("Invalid Date Format Detected");
        return; // Return early to prevent further execution
      } else if (
        combinedMonth === 2 &&
        isValidDayOfMonth(day + " " + month + " " + combinedYear)
      ) {
        setErrorMessage("Invalid Day for February");
        return; // Return early to prevent further execution
      } else if (
        (combinedMonth === 4 ||
          combinedMonth === 6 ||
          combinedMonth === 9 ||
          combinedMonth === 11) &&
        !isValidDayOfMonth(day + " " + month + " " + combinedYear)
      ) {
        setErrorMessage("Invalid Day for the Selected Month");
        return; // Return early to prevent further execution
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
    const inputId = event.currentTarget.id;

    if (
      (inputId === "idType" && !/^[A-Za-z]*$/.test(key)) || // Allow only alphabetic characters for idType input
      (inputId === "mobileNumber" && !/^\d*$/.test(key)) || // Allow only digits for mobileNumber input
      (inputId === "homeNumber" && !/^\d*$/.test(key)) || // Allow only digits for homeNumber input
      (inputId === "alternativeNumber" && !/^\d*$/.test(key)) // Allow only digits for alternativeNumber input
    ) {
      event.preventDefault();
      return; // Return early to prevent further execution
    }

    // Rest of the code...
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
      <div className="id-type-option">
        <label htmlFor="mobileNumber">Mobile Number :</label>
        <Input
          id="mobileNumber"
          style={{
            width: "250px", // adjust the width according to your layout
          }}
          placeholder="Enter mobile number"
          maxLength={10}
          pattern="^\d*$"
          title="Mobile number must contain only digits"
          onKeyDown={handleInputKeyDown}
          onChange={(e) => {
            setMobileNumber(e.target.value);
            onMobileNumberChange(e.target.value);
          }}
          value={mobileNumber}
        />
      </div>
      <div className="id-type-option">
        <label htmlFor="homeNumber">Home Number :</label>
        <Input
          id="homeNumber"
          style={{
            width: "250px", // adjust the width according to your layout
          }}
          placeholder="Enter home number"
          maxLength={10}
          pattern="^\d*$"
          title="Home number must contain only digits"
          onKeyDown={handleInputKeyDown}
          onChange={(e) => {
            setHomeNumber(e.target.value);
            onHomeNumberChange(e.target.value);
          }}
          value={homeNumber}
        />
      </div>
      <div className="id-type-option">
        <label htmlFor="alternativeNumber">Alternative Number :</label>
        <Input
          id="alternativeNumber"
          style={{
            width: "250px", // adjust the width according to your layout
          }}
          placeholder="Enter alternative number"
          maxLength={10}
          pattern="^\d*$"
          title="Alternative number must contain only digits"
          onKeyDown={handleInputKeyDown}
          onChange={(e) => {
            setAlternativeNumber(e.target.value);
            onAlternativeNumberChange(e.target.value);
          }}
          value={alternativeNumber}
        />
      </div>
      <div style={{ marginLeft: 8 }} className="search-button-container">
        <Button type="primary">Search</Button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default IdType;
