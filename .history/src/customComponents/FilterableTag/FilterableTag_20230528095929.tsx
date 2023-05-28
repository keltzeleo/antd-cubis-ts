// FilterableTag.tsx
import { Checkbox, Tag } from "antd";
import React from "react";

interface FilterableTagProps {
  color: string;
  label: string;
  checked: boolean;
  onCheckboxChange: () => void;
}

const FilterableTag: React.FC<FilterableTagProps> = ({
  color,
  label,
  checked,
  onCheckboxChange,
}) => (
  <Checkbox checked={checked} onChange={onCheckboxChange}>
    <Tag color={color}>
      <b>{label}</b> {label.toLowerCase()}
    </Tag>
  </Checkbox>
);

export default FilterableTag;
