import React from 'react';

interface LegendItem {
  category: string;
  label: string;
  color: string;
}

interface LegendProps {
  legendData: LegendItem[];
}

const Legend: React.FC<LegendProps> = ({ legendData }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      {legendData.map((item) => (
        <div key={item.category} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 5 }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
