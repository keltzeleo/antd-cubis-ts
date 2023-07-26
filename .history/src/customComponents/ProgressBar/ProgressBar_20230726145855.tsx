import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

interface ProgressBarProps {
  current: number;
  percent: number;
  items: Array<{
    title: string;
    subTitle?: string;
    description: React.ReactNode;
  }>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  percent,
  items,
}) => {
  return (
    <Steps current={current} percent={percent} progressDot>
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
