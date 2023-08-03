import React from "react";

interface Theme {
  [key: string]: string;
}

interface LegendItem {
  category: string;
  label: string;
  color: string;
}

interface LegendProps {
  legendData: LegendItem[];
  theme: Theme;
}

const Legend: React.FC<LegendProps> = ({ legendData, theme }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 0,
        color: theme["colorTextBase"],
        fontFamily: theme["fontFamily"],
      }}
    >
      {legendData.map((item) => (
        <div
          key={item.category}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: item.color,
              marginRight: 5,
              borderRadius: 2,
            }}
          />
          <span style={{ marginRight: 16 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
