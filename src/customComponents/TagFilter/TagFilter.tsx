// TagFilter.tsx
import React from "react";
import FilterableTag from "../../../src/customComponents/FilterableTag/FilterableTag";

interface TagFilterProps {
  tags: { value: string; label: string; color: string }[];
  selectedTags: string[];
  onTagChange: (tagValue: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagChange,
}) => (
  <span
    style={{
      marginLeft: 4,
      marginTop: 8,
      display: "flex",
      justifyContent: "flex-start",
    }}
  >
    {tags.map((tag) => (
      <FilterableTag
        key={tag.value}
        color={tag.color}
        label={tag.label}
        checked={selectedTags.includes(tag.value)}
        onCheckboxChange={() => onTagChange(tag.value)}
      />
    ))}
  </span>
);

export default TagFilter;
