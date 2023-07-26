import { Button, Steps, message } from "antd";
import React from "react";
import "./napsWizard2.css";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

interface NapsWizard2Props {
  theme: Theme;
}

const NapsWizard2: React.FC<NapsWizard2Props> = ({ theme }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const totalSteps = 6; // 總步驟數量

  // 狀態來跟蹤已完成步驟和待定步驟的數量
  const [completedSteps, setCompletedSteps] = React.useState(0);
  const [pendingSteps, setPendingSteps] = React.useState(totalSteps - 1);

  const handleNext = () => {
    // 更新已完成步驟和待定步驟的數量
    setCompletedSteps(currentStep + 1);
    setPendingSteps(totalSteps - (currentStep + 1) - 1);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    message.success("All steps completed!");
  };

  // 函數用來動態顯示步驟的圖示和數字
  const getStepDisplay = (stepIndex: number) => {
    if (stepIndex < completedSteps) {
      return <span className="step">{stepIndex + 1}</span>;
    } else if (stepIndex === completedSteps) {
      return <span className="current-step">{stepIndex + 1}</span>;
    } else if (stepIndex === completedSteps + 1) {
      return <span className="step-number">{stepIndex + 1}</span>;
    } else if (stepIndex === completedSteps + 2) {
      return <span className="step-number">{stepIndex + 1}</span>;
    } else {
      return (
        <span className="step-number">{completedSteps + 3 - stepIndex}</span>
      );
    }
  };

  return (
    <div>
      <div className="steps-container">
        <div className="completed-steps">
          {[...Array(Math.min(completedSteps, 2))].map((_, index) => (
            <div key={index} className="step">
              {getStepDisplay(index)}
            </div>
          ))}
          {completedSteps > 2 && (
            <div className="step-number">+{completedSteps - 2}</div>
          )}
        </div>
        <div className="current-step">
          <div className="step">{getStepDisplay(completedSteps)}</div>
          <div className="step-title">
            {currentStep < totalSteps ? `Step ${currentStep + 1}` : ""}
          </div>
        </div>
        <div className="pending-steps">
          {Array.from({ length: Math.min(pendingSteps, 2) }).map((_, index) => (
            <div key={index} className="step">
              {getStepDisplay(completedSteps + index + 1)}
            </div>
          ))}
          {pendingSteps > 2 && (
            <div className="step-number">+{pendingSteps}</div>
          )}
        </div>
      </div>
      <div className="steps-content">
        {currentStep >= 0 && currentStep < totalSteps ? (
          <div>
            <h2>{`Step ${currentStep + 1}`}</h2>
            {Step({}).props.children[currentStep]}
          </div>
        ) : null}
      </div>
      <div className="steps-action">
        {currentStep < totalSteps - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === totalSteps - 1 && (
          <Button type="primary" onClick={handleFinish}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default NapsWizard2;
