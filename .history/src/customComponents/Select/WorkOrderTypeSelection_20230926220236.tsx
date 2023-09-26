// WorkOrderTypeSelection.tsx

import { Select } from "antd";
import React from "react";
import SquircleBorder from "../../customComponents/SquircleBorder/SquircleBorder";
import { workOrderType } from "../../pages/WaterWorkOrder/MeterChange/workOrderType";

const { Option } = Select;

interface Theme {
  [key: string]: string;
}

interface WorkOrderSelectionProps {
  onSelect: (value: string) => void; // Add this prop to handle selection
  theme: Theme;
}

const WorkOrderTypeSelection: React.FC<WorkOrderSelectionProps> = ({
  onSelect, // Use the onSelect prop to handle selection changes
  theme,
}) => {
  const handleChange = (value: string) => {
    // Find the selected work order object based on the value
    const selectedWorkOrder = workOrderType.find(
      (workOrder) => workOrder.code === value
    );

    if (selectedWorkOrder) {
      // Pass an object containing code and description to the onSelect function
      onSelect({
        code: selectedWorkOrder.code,
        description: selectedWorkOrder.description,
      });
    }
  };

  return (
    <Select
      placeholder="Select Work Order Type"
      onChange={handleChange}
      style={{ width: "100%" }}
    >
      {workOrderType.map((workOrder) => (
        <Option key={workOrder.code} value={workOrder.code}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SquircleBorder
                size={20}
                curvature={0.43}
                backgroundColor="transparent"
                color={theme["colorTextBase"]}
                rotate={0}
                borderType="dashed"
                borderWidth={1}
                borderColor={theme["cyan"]}
                fontWeight={700}
                character={workOrder.code}
              />
              <span style={{ marginLeft: "8px" }}>{workOrder.description}</span>
            </div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default WorkOrderTypeSelection;
