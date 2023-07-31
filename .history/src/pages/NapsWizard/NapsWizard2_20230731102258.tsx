import { PageContainer } from "@ant-design/pro-components";
import { Button, Popover, Steps, message } from "antd";
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

    const completedStepsList = Array.from(
      { length: completedSteps },
      (_, index) => index + 1
    );
    const pendingStepsList = Array.from(
      { length: pendingSteps },
      (_, index) => completedSteps + index + 1
    );

    const popoverContent = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {forms.map((FormComponent, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentStep(index);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              cursor: "pointer",
              backgroundColor:
                currentStep === index ? theme["orange.6"] : "transparent",
              color: currentStep === index ? "#fff" : "inherit",
            }}
          >
            <div style={{ marginRight: "8px" }}>{index + 1}</div>
            <div>
              {FormComponent.name}{" "}
              {/* Assuming FormComponent has a static "name" property */}
            </div>
          </div>
        ))}
      </div>
    );

    const renderStepTitle = (index: number, title: string) => {
      const isCompleted = index < completedSteps;
      const isCurrent = index === completedSteps;

      return (
        <Popover
          placement="top"
          title={title}
          content={popoverContent}
          trigger="hover"
          visible={isCompleted || isCurrent ? true : false}
        >
          <span className={isCurrent ? "current-step" : "step"}>
            {index + 1}
          </span>
        </Popover>
      );
    };

    const renderSteps = () => (
      <div className="steps-container">
        <div className="completed-steps">
          {forms
            .slice(0, Math.min(completedSteps, 2))
            .map((FormComponent, index) => (
              <div key={index} className="">
                {renderStepTitle(index, FormComponent.name)}
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
          {renderCircularProgress()}
        </div>
        <div className="pending-steps">
          {Array.from({ length: Math.min(pendingSteps, 2) }).map((_, index) => (
            <div key={index} className="step">
              {renderStepTitle(
                completedSteps + index + 1,
                forms[completedSteps + index + 1].name
              )}
            </div>
          ))}
          {pendingSteps > 2 && (
            <div className="step-number" style={{ marginLeft: 54 }}>
              +{pendingSteps - 2}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStepListPopover = () => {
    // This function generates the content of the popover with the list of steps
    return (
      <div>
        {forms.map((StepComponent, index) => (
          <div key={index} onClick={() => handleStepClick(index)}>
            {getStepDisplay(index)}{" "}
            {StepComponent.displayName || StepComponent.name}
          </div>
        ))}
      </div>
    );
  };

  const handleStepClick = (stepIndex: number) => {
    // This function handles the click on a step in the popover
    setCurrentStep(stepIndex);
  };

  return (
    <div>
      <PageContainer>
        {" "}
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
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            marginLeft: -16,
            marginRight: -16,
            marginBottom: -16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12 16px",
            borderRadius: 8,
            backgroundColor: `${theme["cyan.3"]}50`, // Apply transparency to the background color
            backdropFilter: "blur(10px)", // Apply the blur filter
            zIndex: 999,
          }}
        >
          <div style={{ flex: "1" }}>
            {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {currentStep < totalSteps - 1 && (
              <Button type="primary" onClick={handleNext}>
                Save & Proceed to Next ⇾
              </Button>
            )}
            {currentStep === totalSteps - 1 && (
              <Button type="primary" onClick={handleFinish}>
                Done
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default NapsWizard2;
