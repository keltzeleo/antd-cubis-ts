import { Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

interface IdTypeProps {
  onChange: (value: string) => void;
}

const IdType: React.FC<IdTypeProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  const handleSearch = (value: string) => {
    // Perform search based on the input value
    console.log("Search:", value);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleOptionChange}
      showSearch
      style={{ width: 200 }}
      placeholder="Select ID Type"
      optionFilterProp="children"
      filterOption={false}
      onSearch={handleSearch}
    >
      <Option value="MyKad">MyKad</Option>
      <Option value="MyTentera">MyTentera</Option>
      <Option value="MyPR">MyPR</Option>
      <Option value="MyKAS">MyKAS</Option>
      <Option value="Commercial">Commercial</Option>
    </Select>
  );
};

export default IdType;
