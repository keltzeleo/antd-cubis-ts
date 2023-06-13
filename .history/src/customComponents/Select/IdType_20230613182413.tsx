import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface IdTypeProps {
  selectedIdType: string;
  handleIdTypeChange: (value: string) => void;
}

const IdType: React.FC<IdTypeProps> = ({
  selectedIdType,
  handleIdTypeChange,
}) => (
  <Select
    value={selectedIdType}
    onChange={handleIdTypeChange}
    className={
      selectedIdType === "MyKad"
        ? "myKad-select"
        : selectedIdType === "MyTentera"
        ? "myTentera-select"
        : selectedIdType === "MyPR"
        ? "myPR-select"
        : selectedIdType === "MyKAS"
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
);

export default IdType;
