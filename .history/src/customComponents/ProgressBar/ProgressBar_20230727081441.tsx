import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

interface ProgressBarProps {
  current: number;
  percent: number;
  items: array;
    title: string;
    subTitle?: string;
    description: React.ReactNode;
    theme: Theme;
  }>;
  progressDot?: boolean; // Add the optional progressDot prop
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  percent,
  items,
  theme,
  progressDot, // Add progressDot to the destructured props
}) => {
  return (
    <Steps current={current} percent={percent} progressDot={progressDot}>
      {items.map((item, index) => (
        <Step
          key={index}
          title={item.title}
          subTitle={item.subTitle}
          description={item.description}
        />
      ))}
    </Steps>
  );
};

export default ProgressBar;
