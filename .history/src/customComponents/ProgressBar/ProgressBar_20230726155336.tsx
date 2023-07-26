import { Steps } from "antd";
import { Theme } from "antd/es/config-provider/context";
import React from "react";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

interface ProgressBarProps {
  current: number;
  percent: number;
  items: Array<{
    title: string;
    subTitle?: string;
    description: React.ReactNode;
    theme: Theme;
  }>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  percent,
  items,
  theme,
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
