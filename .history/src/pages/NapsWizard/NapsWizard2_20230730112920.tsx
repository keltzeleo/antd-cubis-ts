import { PageContainer } from "@ant-design/pro-components";
import { Button, Steps, message } from "antd";
import React from "react";
import BillPaymentApprovalForm from "../Forms/BillPaymentApprovalForm";
import CompleteMeterInstallationForm from "../Forms/CompleteMeterInstallationForm";
import ConnectionApprovalForm from "../Forms/ConnectionApprovalForm";
import GetNeighbourAccountForm from "../Forms/GetNeighbourAccountForm";
import IssueDepositAndInstallationBillForm from "../Forms/IssueDepositAndInstallationBillForm";
import PlanApprovalInfoForm from "../Forms/PlanApprovalInfoForm";
import SiteInspectionApprovalForm from "../Forms/SiteInspectionApprovalForm_";
import SiteVisitApprovalForm, {
  SiteVisitApprovalFormProps,
} from "../Forms/SiteVisitApprovalForm";

import "./napsWizard2.css";

const { Step } = Steps;

interface Theme {
  [key: string]: string;
}

// Define a union type for all the form props
type FormProps = SiteVisitApprovalFormProps;

// Update the forms array with the correct type
const forms: React.ComponentType<FormProps>[] = [
  SiteVisitApprovalForm,
  PlanApprovalInfoForm,
  SiteInspectionApprovalForm,
  GetNeighbourAccountForm,
  BillPaymentApprovalForm,
  ConnectionApprovalForm,
  IssueDepositAndInstallationBillForm,
  CompleteMeterInstallationForm,
];

const NapsWizard2: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const totalSteps = forms.length;
  const [completedSteps, setCompletedSteps] = React.useState(0);
  const [pendingSteps, setPendingSteps] = React.useState(totalSteps - 1);

  const handleNext = () => {
    setCompletedSteps(currentStep + 1);
    setPendingSteps(totalSteps - (currentStep + 1) - 1);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCompletedSteps(currentStep - 1);
      setPendingSteps(totalSteps - (currentStep - 1) - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    message.success("All steps completed!");
  };

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

  const renderCircularProgress = () => {
    const radius = 30; // Adjust the radius as needed
    const circumference = 2 * Math.PI * radius;
    const progress = (completedSteps / (totalSteps - 1)) * 100;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="circular-progress-container">
        <svg
          className="circular-progress"
          height={radius * 2}
          width={radius * 2}
        >
          <circle
            className="progress-background"
            cx={radius}
            cy={radius}
            r={radius - 3} // Adjust the thickness of the progress ring
            fill="transparent"
            stroke={theme["orange.1"]}
            strokeWidth="2" // Adjust the thickness of the progress ring
          />
          <circle
            className="progress"
            cx={radius}
            cy={radius}
            r={radius - 3} // Adjust the thickness of the progress ring
            fill="transparent"
            stroke={theme["orange.6"]} // Adjust the color as needed
            strokeWidth="1" // Adjust the thickness of the progress ring
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="current-step-indicator">
          <div className="step-indicator"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageContainer
        footer={[
          <div
            style={{
              background: "rgba(20,47,233,0)",
              padding: 12,
              display: flex,
              justify-content: space-between,
            }}
          >
            {currentStep > 0 && (
              <div
                style={{
                  flex: 1,
                }}
              >
                <Button onClick={handlePrev}>Previous</Button>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
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
            </div>
          </div>,
        ]}
      >
        <div className="steps-container">
          <div className="completed-steps">
            {[...Array(Math.min(completedSteps, 2))].map((_, index) => (
              <div key={index} className="">
                {getStepDisplay(index)}
              </div>
            ))}
            {completedSteps > 2 && (
              <div className="step-number" style={{ marginLeft: 12 }}>
                +{completedSteps - 2}
              </div>
            )}
          </div>
          <div className="current-step">
            <div className="step">
              {" "}
              <h2>{currentStep < totalSteps ? ` ${currentStep + 1}` : " "}</h2>
            </div>
            {/* Add the circular progress indicator here */}
            {renderCircularProgress()}
          </div>
          <div className="pending-steps">
            {Array.from({ length: Math.min(pendingSteps, 2) }).map(
              (_, index) => (
                <div key={index} className="step">
                  {getStepDisplay(completedSteps + index + 1)}
                </div>
              )
            )}
            {pendingSteps > 2 && (
              <div className="step-number" style={{ marginLeft: 54 }}>
                +{pendingSteps - 2}
              </div>
            )}
          </div>
        </div>
        <div className="steps-content">
          {currentStep >= 0 && currentStep < totalSteps ? (
            <div>
              <h2>{`Step ${currentStep + 1}`}</h2>
              {/* Render the form component based on the current step */}
              {React.createElement(forms[currentStep])}
            </div>
          ) : null}
        </div>
      </PageContainer>
    </div>
  );
};

export default NapsWizard2;
