import { Steps } from "antd";

const { Step } = Steps;

const ProgressBar = ({ current, percent, items }) => {
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
